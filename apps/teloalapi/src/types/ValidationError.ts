interface ValidationErrorDetails {
  /**
   * A path to the invalid field.
   */
  path: string;
  /**
   * A single word code represents the error's type.
   */
  code: string;
  /**
   * A human readable description of the error.
   */
  message: string;
  /**
   * Some additional details that the 3 attributes above don't cover.
   */
  info: object;
}

export type ValidationError = {
  error: {
    statusCode: 422;
    name: string;
    message: string;
    code: "VALIDATION_FAILED";
    details: Array<ValidationErrorDetails>;
  };
};
