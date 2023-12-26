import { HttpErrors, RequestBodyObject, api, post, requestBody } from "@loopback/rest";
import { parseCharacters, AlCharacter } from "@teloal/parse-character";
import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/Users.repository";

type UserSignupBody = {
  username: string;
  password: string;
};

const userSignupBodySchema: Partial<RequestBodyObject> = {
  description: "Required input for signup",
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string",
            description: "The chosen username for the account. Must be unique",
          },
          password: {
            type: "string",
            description: "The chosen password for the account. Must be at least 10 chars long.",
          },
        },
      },
    },
  },
};

@api({ basePath: "/v1/auth" })
export class AuthController {
  @repository(UsersRepository)
  protected usersRepo: UsersRepository;

  @post("/signup")
  async getCharacter(
    @requestBody(userSignupBodySchema) signupPayload: UserSignupBody,
  ): Promise<AlCharacter> {
    const html = await this.alService.getCharacterPage(name);

    const char = (await parseCharacters(html))[0];

    if (!char) {
      throw new HttpErrors.NotFound(`The character "${name}" doesn't exist.`);
    }

    return char;
  }
}
