import { inject } from "@loopback/core";
import { HttpErrors, api, get, getModelSchemaRef, param, response } from "@loopback/rest";
import { NotFoundErrorSchema } from "../schemas/NotFoundError";
import { AdventureLandService } from "../services";
import { cache } from "@teloal/lb4-cache";
import { parseCharacters, AlCharacter } from "@teloal/parse-character";

@api({ basePath: "/v1/al" })
export class AdventureLandController {
  @inject("services.AdventureLand")
  protected alService: AdventureLandService;

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
    ...NotFoundErrorSchema,
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
    ...NotFoundErrorSchema,
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

  @cache({ ttl: 45 })
  @get("/merchants")
  @response(200, {
    description: "Returns a list of the online merchants as scraped from the adventure land page.",
    content: {
      "application/json": {
        schema: { type: "array", items: getModelSchemaRef(AlCharacter) },
      },
    },
  })
  async getMerchants(): Promise<Array<AlCharacter>> {
    const html = await this.alService.getMerchantsPage();

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
    const html = await this.alService.getDataPage();

    const json = html.trim().replace(/^[^{]+?(\{.*?\});$/i, "$1");

    return json;
  }
}
