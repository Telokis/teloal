// This file is auto-generated. Do not edit.
// Schema of type 'ValidationError' from file './apps/teloalapi/src/types/ValidationError.ts'

import { SchemaObject } from "@loopback/rest";

export const validationErrorSchema: SchemaObject = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/ValidationError",
  definitions: {
    ValidationError: {
      type: "object",
      properties: {
        error: {
          type: "object",
          properties: {
            statusCode: {
              type: "number",
              const: 422,
            },
            name: {
              type: "string",
            },
            message: {
              type: "string",
            },
            code: {
              type: "string",
              const: "VALIDATION_FAILED",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    description: "A path to the invalid field.",
                  },
                  code: {
                    type: "string",
                    description:
                      "A single word code represents the error's type.",
                  },
                  message: {
                    type: "string",
                    description: "A human readable description of the error.",
                  },
                  info: {
                    type: "object",
                    description:
                      "Some additional details that the 3 attributes above don't cover.",
                  },
                },
                required: ["path", "code", "message", "info"],
                additionalProperties: false,
              },
            },
          },
          required: ["statusCode", "name", "message", "code", "details"],
          additionalProperties: false,
        },
      },
      required: ["error"],
      additionalProperties: false,
    },
  },
};
