module.exports = {
  port: "PORT",
  al: {
    token: "AL_TOKEN",
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
