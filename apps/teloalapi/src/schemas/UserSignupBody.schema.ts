// This file is auto-generated. Do not edit.
// Schema of type 'UserSignupBody' from file './apps/teloalapi/src/controllers/auth.controller.ts'

import { SchemaObject } from "@loopback/rest";

export const userSignupBodySchema: SchemaObject = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/UserSignupBody",
  definitions: {
    UserSignupBody: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "The chosen username for the account. Must be unique",
          minLength: 3,
          maxLength: 20,
          pattern: "^[a-zA-Z](?:[a-zA-Z0-9]+[-_]?)+[a-zA-Z0-9]+$",
        },
        password: {
          type: "string",
          description:
            "The chosen password for the account. Must be at least 10 chars long.",
          minLength: 10,
        },
      },
      required: ["username", "password"],
      additionalProperties: false,
    },
  },
};
