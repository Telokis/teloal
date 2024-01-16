import { ResponseObject } from "@loopback/rest";
import { successResponseObjectSchema } from "../SuccessResponseObject.schema";

export const SuccessResponse: ResponseObject = {
  description: "Success.",
  content: {
    "application/json": {
      schema: successResponseObjectSchema,
    },
  },
};
