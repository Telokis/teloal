// This file is auto-generated. Do not edit.
// Schema of type 'SuccessResponseObject' from file './apps/teloalapi/src/types/SuccessResponseObject.ts'

import { SchemaObject } from "@loopback/rest";

export const successResponseObjectSchema: SchemaObject = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/SuccessResponseObject",
  definitions: {
    SuccessResponseObject: {
      type: "object",
      properties: {
        success: {
          type: "boolean",
          const: true,
        },
      },
      required: ["success"],
      additionalProperties: false,
    },
  },
};
