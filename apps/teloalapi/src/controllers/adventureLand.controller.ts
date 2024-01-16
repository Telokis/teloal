import { inject } from "@loopback/core";
import { HttpErrors, api, get, getModelSchemaRef, param, response } from "@loopback/rest";
import { NotFoundErrorResponse } from "../schemas/responses/NotFoundResponse";
import { AdventureLandService } from "../services/adventureLand.service";
import { cache } from "@teloal/lb4-cache";
import { parseCharacters, AlCharacter } from "@teloal/parse-character";
import { AlMerchants } from "../types/AlMerchants";
import { AlMerchant } from "../models/alMerchant.model";
import { repository } from "@loopback/repository";
import { AlCharacterRepository } from "../repositories/alCharacter.repository";
import { AlGameDataRepository } from "../repositories/alGameData.repository";

@api({ basePath: "/v1/al" })
export class AdventureLandController {
  @inject("services.AdventureLand")
  protected alService: AdventureLandService;

  @repository(AlCharacterRepository)
  protected alCharRepo: AlCharacterRepository;

  @repository(AlGameDataRepository)
  protected alGameDataRepo: AlGameDataRepository;

  @cache({ ttl: 5 })
  @get("/character/{name}")
  @response(200, {
    description: "Returns the character as scraped from the adventure land page.",
    content: {
      "application/json": {
        schema: getModelSchemaRef(AlCharacter),
      },
    },
  })
  @response(404, {
    ...NotFoundErrorResponse,
    description: "The requested character was not found.",
  })
  async getCharacter(@param.path.string("name") name: string): Promise<AlCharacter> {
    const html = await this.alService.getCharacterPage(name);

    const char = (await parseCharacters(html))[0];

    if (!char) {
      throw new HttpErrors.NotFound(`The character "${name}" doesn't exist.`);
    }

    return char;
  }

  @cache({ ttl: 15 })
  @get("/player/{name}")
  @response(200, {
    description:
      "Returns a list of characters for the requested player as scraped from the adventure land page.",
    content: {
      "application/json": {
        schema: { type: "array", items: getModelSchemaRef(AlCharacter) },
      },
    },
  })
  @response(404, {
    ...NotFoundErrorResponse,
    description: "The requested player was not found.",
  })
  async getPlayer(@param.path.string("name") name: string): Promise<Array<AlCharacter>> {
    const html = await this.alService.getPlayerPage(name);

    const chars = await parseCharacters(html);

    if (chars.length === 0) {
      throw new HttpErrors.NotFound(`The player "${name}" doesn't exist.`);
    }

    return chars;
  }

  @cache({ ttl: 60 })
  @get("/characters")
  @response(200, {
    description:
      "Returns a list of the top 500 characters as scraped from the adventure land page.",
    content: {
      "application/json": {
        schema: { type: "array", items: getModelSchemaRef(AlCharacter) },
      },
    },
  })
  async getCharacters(): Promise<Array<AlCharacter>> {
    const html = await this.alService.getCharactersPage();

    const chars = await parseCharacters(html);

    return chars;
  }

  @cache({ ttl: 60 })
  @get("/data")
  @response(200, {
    description: "Returns the game G data as json.",
    content: {
      "application/json": {
        schema: { type: "object" },
      },
    },
  })
  async getData(): Promise<string> {
    const entry = await this.alGameDataRepo.findOne({ order: ["createdAt DESC"] });

    if (!entry) {
      throw new HttpErrors.NotFound(`There is no G data stored yet.`);
    }

    return entry.json;
  }

  @cache({ ttl: 75 })
  @get("/trades")
  @response(200, {
    description: "Returns a list of the online merchants as scraped from the adventure land page.",
    content: {
      "application/json": {
        schema: { type: "array", items: getModelSchemaRef(AlMerchant) },
      },
    },
  })
  async getTrades(): Promise<Array<AlMerchant>> {
    const json = JSON.parse(await this.alService.getMerchantsTrades()) as AlMerchants;

    // @ts-ignore
    return json[0].chars.map((merchant) => new AlMerchant(merchant));
  }
}
