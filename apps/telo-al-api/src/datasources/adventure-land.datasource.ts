import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const config = {
  name: "AdventureLand",
  connector: "rest",
  crud: false,
  operations: [
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: "https://adventure.land/character/{name}",
      },
      functions: {
        getCharacterPage: ["name"],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: "https://adventure.land/player/{name}",
      },
      functions: {
        getPlayerPage: ["name"],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: "https://adventure.land/characters",
      },
      functions: {
        getCharactersPage: [],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: "https://adventure.land/merchants",
      },
      functions: {
        getMerchantsPage: [],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: "https://adventure.land/data.js",
      },
      functions: {
        getDataPage: [],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class AdventureLandDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = "AdventureLand";
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.AdventureLand", { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
