module.exports = {
  port: "PORT",
  al: {
    token: "AL_TOKEN",
  },
  auth: {
    pepper: "AUTH_PEPPER",
    recaptcha: {
      siteKey: "AUTH_RECAPTCHA_SITE_KEY",
      secretKey: "AUTH_RECAPTCHA_SECRET_KEY",
    },
  },
  mongo: {
    host: "MONGO_HOST",
    user: "MONGO_USER",
    password: "MONGO_PASSWORD",
    database: "MONGO_DATABASE",
  },
  crons: {
    gameDataFetcher: {
      cronTime: "CRONS_GAME_DATA_FETCHER_CRONTIME",
    },
  },
};
