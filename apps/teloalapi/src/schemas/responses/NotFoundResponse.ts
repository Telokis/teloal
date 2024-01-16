import { ResponseObject } from "@loopback/rest";

export const NotFoundErrorResponse: ResponseObject = {
  description: "The request did not yield any result.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "NotFoundError",
        properties: {
          error: {
            type: "object",
            required: ["statusCode", "name", "message"],
            properties: {
              statusCode: {
                type: "number",
                description: "Constant value for this error.",
                enum: [404],
              },
              name: {
                type: "string",
                description: "Constant value for this error.",
                enum: ["NotFoundError"],
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
