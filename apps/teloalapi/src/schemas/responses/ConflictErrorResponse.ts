import { ResponseObject } from "@loopback/rest";

export const ConflictErrorResponse: ResponseObject = {
  description: "The request triggered a conflict.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "ConflictError",
        properties: {
          error: {
            type: "object",
            required: ["statusCode", "name", "message"],
            properties: {
              statusCode: {
                type: "number",
                description: "Constant value for this error.",
                enum: [409],
              },
              name: {
                type: "string",
                description: "Constant value for this error.",
                enum: ["ConflictError"],
              },
              message: {
                type: "string",
                description: "Gives more information regarding the cause of the error.",
              },
            },
          },
        },
      },
    },
  },
};
