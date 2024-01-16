import { ResponseObject } from "@loopback/rest";
import { validationErrorSchema } from "../ValidationError.schema";

export const ValidationErrorResponse: ResponseObject = {
  description: "The request validation failed.",
  content: {
    "application/json": {
      schema: validationErrorSchema,
    },
  },
};
