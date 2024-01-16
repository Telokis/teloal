// This file is auto-generated. Do not edit.
// Schema of type 'User' from file './apps/teloalapi/src/types/User.ts'

import { SchemaObject } from "@loopback/rest";

export const userSchema: SchemaObject = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/User",
  definitions: {
    User: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        role: {
          $ref: "#/definitions/UserRole",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
      required: ["username", "password", "role"],
      additionalProperties: false,
    },
    UserRole: {
      type: "string",
      enum: ["user", "admin"],
    },
  },
};
