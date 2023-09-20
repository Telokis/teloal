import { ResponseObject } from "@loopback/rest";

export const NotFoundErrorSchema: ResponseObject = {
  description: "The request did not yield any result.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "NotFoundError",
        properties: {
          error: {
            type: "object",
            properties: {
              statusCode: { type: "number", const: 404 },
              name: { type: "string", const: "NotFoundError" },
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
};
