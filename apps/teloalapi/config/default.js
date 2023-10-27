require("dotenv").config();
const path = require("path");

function parseIntDefault(str, radix, defaultValue) {
  const res = parseInt(str, radix);

  if (Object.is(NaN, res)) {
    return defaultValue;
  }

  return res;
}

function urlDefault(maybeUrl, defaultValue) {
  if (!maybeUrl) {
    return defaultValue;
  }

  return maybeUrl.endsWith("/") ? maybeUrl.substring(0, -1) : maybeUrl;
}

module.exports = {
  prod: process.env.NODE_ENV === "production",
  port: parseIntDefault(process.env.PORT, 10, 3000),
  al: {
    url: urlDefault(process.env.AL_URL, "https://adventure.land"),
  },
  mongo: {
    port: parseIntDefault(process.env.MONGO_PORT, 10, 27027),
    database: "teloal",
  },
};
