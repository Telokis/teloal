require("dotenv").config();

function parseIntDefault(str, radix, defaultValue) {
  const res = parseInt(str, radix);

  if (Object.is(NaN, res)) {
    return defaultValue;
  }

  return res;
}

function parseBoolDefault(str, defaultValue) {
  if (str === "true") {
    return true;
  }

  if (str === "false") {
    return false;
  }

  return defaultValue;
}

function urlDefault(maybeUrl, defaultValue) {
  if (!maybeUrl) {
    return defaultValue;
  }

  return maybeUrl.endsWith("/") ? maybeUrl.substring(0, -1) : maybeUrl;
}

const env = process.env;

module.exports = {
  prod: env.NODE_ENV === "production",
  port: parseIntDefault(env.PORT, 10, 3000),
  al: {
    url: urlDefault(env.AL_URL, "https://adventure.land"),
  },
  mongo: {
    port: parseIntDefault(env.MONGO_PORT, 10, 27027),
    database: "teloal",
  },
  disableAllCrons: parseBoolDefault(env.DISABLE_ALL_CRONS, false),
  crons: {
    gameDataFetcher: {
      enable: parseBoolDefault(env.CRONS_GAME_DATA_FETCHER_ENABLE, true),
      cronTime: "0 */5 * * * *",
    },
  },
};
