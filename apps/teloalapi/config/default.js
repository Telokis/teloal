const { parseIntDefault, urlDefault, parseBoolDefault } = require("./_helpers");

require("dotenv").config();

const env = process.env;

module.exports = {
  prod: env.NODE_ENV === "production",
  port: parseIntDefault(env.PORT, 3000),
  al: {
    url: urlDefault(env.AL_URL, "https://adventure.land"),
  },
  mongo: {
    port: parseIntDefault(env.MONGO_PORT, 27027),
    database: "teloal",
  },
  auth: {
    bcryptRounds: parseIntDefault(env.AUTH_BCRYPT_ROUNDS, 10),
  },
  disableAllCrons: parseBoolDefault(env.DISABLE_ALL_CRONS, false),
  crons: {
    gameDataFetcher: {
      enable: parseBoolDefault(env.CRONS_GAME_DATA_FETCHER_ENABLE, true),
      cronTime: "0 */5 * * * *",
    },
  },
};
