// This file is auto-generated. Do not edit.
// Schema of type 'ConfigInterface' from file './apps/teloalapi/src/types/ConfigInterface.ts'

export const configInterfaceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    prod: {
      type: "boolean",
    },
    host: {
      type: "string",
    },
    port: {
      type: "number",
    },
    al: {
      type: "object",
      properties: {
        url: {
          type: "string",
        },
        token: {
          type: "string",
        },
      },
      required: ["url"],
      additionalProperties: false,
    },
    auth: {
      type: "object",
      properties: {
        bcryptRounds: {
          type: "number",
        },
        pepper: {
          type: "string",
        },
        recaptcha: {
          type: "object",
          properties: {
            siteKey: {
              type: ["string", "null"],
            },
            secretKey: {
              type: ["string", "null"],
            },
          },
          required: ["siteKey", "secretKey"],
          additionalProperties: false,
        },
      },
      required: ["bcryptRounds", "pepper", "recaptcha"],
      additionalProperties: false,
    },
    mongo: {
      type: "object",
      properties: {
        host: {
          type: "string",
        },
        port: {
          type: "number",
        },
        user: {
          type: "string",
        },
        password: {
          type: "string",
        },
        database: {
          type: "string",
        },
      },
      required: ["host", "port", "user", "password", "database"],
      additionalProperties: false,
    },
    disableAllCrons: {
      type: "boolean",
    },
    crons: {
      type: "object",
      properties: {
        gameDataFetcher: {
          type: "object",
          properties: {
            cronTime: {
              type: "string",
              description:
                "Cron pattern to use. See https://github.com/kelektiv/node-cron#cron-patterns",
            },
            enable: {
              type: "boolean",
              description: "Whether this cron is enabled or not.",
            },
          },
          required: ["cronTime", "enable"],
          additionalProperties: false,
        },
      },
      required: ["gameDataFetcher"],
      additionalProperties: false,
    },
    util: {
      description: "Below are things provided by the module itself",
    },
    get: {},
    has: {},
  },
  required: [
    "prod",
    "port",
    "al",
    "auth",
    "mongo",
    "disableAllCrons",
    "crons",
    "util",
    "get",
    "has",
  ],
  additionalProperties: false,
  definitions: {},
} as const;
