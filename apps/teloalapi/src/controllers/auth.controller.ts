import { HttpErrors, RequestBodyObject, api, post, requestBody, response } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { UsersRepository } from "../repositories/Users.repository";
import { userSignupBodySchema } from "../schemas/UserSignupBody.schema";
import { ConflictErrorResponse } from "../schemas/responses/ConflictErrorResponse";
import { ValidationErrorResponse } from "../schemas/responses/ValidationErrorResponse";
import { SuccessResponse } from "../schemas/responses/SuccessResponse";
import { SuccessResponseObject } from "../types/SuccessResponseObject";
import { hashPassword } from "@teloal/pseudo-crypto";
import config from "config";
import { UserRole } from "../types/User";

export type UserSignupBody = {
  /**
   * The chosen username for the account. Must be unique
   *
   * @minLength 3
   * @maxLength 20
   * @pattern ^[a-zA-Z](?:[a-zA-Z0-9]+[-_]?)+[a-zA-Z0-9]+$
   */
  username: string;

  /**
   * The chosen password for the account. Must be at least 10 chars long.
   *
   * @minLength 10
   */
  password: string;
};

const userSignupBodyDesc: Partial<RequestBodyObject> = {
  description: "Required input for signup",
  required: true,
  content: {
    "application/json": {
      schema: userSignupBodySchema,
    },
  },
};

@api({ basePath: "/v1/auth" })
export class AuthController {
  @repository(UsersRepository)
  protected usersRepo: UsersRepository;

  @post("/signup")
  @response(200, SuccessResponse)
  @response(409, ConflictErrorResponse)
  @response(422, ValidationErrorResponse)
  async signup(
    @requestBody(userSignupBodyDesc) signupPayload: UserSignupBody,
  ): Promise<SuccessResponseObject> {
    const { username, password } = signupPayload;

    if (password.length < 10) {
      throw new HttpErrors.BadRequest(`The password must be at least 10 characters long.`);
    }

    if (await this.usersRepo.exists(username)) {
      throw new HttpErrors.Conflict(`This username is already in use.`);
    }

    const hashedPassword = await hashPassword(
      password,
      config.auth.bcryptRounds,
      config.auth.pepper,
    );

    try {
      await this.usersRepo.create({
        username,
        password: hashedPassword,
        role: UserRole.user,
      });
    } catch (err) {
      console.error(err);
      throw new HttpErrors.InternalServerError("Something went wrong. Try again later.");
    }

    return { success: true };
  }
}
