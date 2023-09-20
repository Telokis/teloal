import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
import config from "config";

const dataSourceConfig = {
  name: "AdventureLand",
  connector: "rest",
  crud: false,
  operations: [
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: `${config.al.url}/character/{name}`,
      },
      functions: {
        getCharacterPage: ["name"],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: `${config.al.url}/player/{name}`,
      },
      functions: {
        getPlayerPage: ["name"],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: `${config.al.url}/characters`,
      },
      functions: {
        getCharactersPage: [],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: `${config.al.url}/merchants`,
      },
      functions: {
        getMerchantsPage: [],
      },
    },
    {
      template: {
        method: "GET",
        fullResponse: false, // We only want the body
        url: `${config.al.url}/data.js`,
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
  static readonly defaultConfig = dataSourceConfig;

  constructor(
    @inject("datasources.config.AdventureLand", { optional: true })
    dsConfig: object = dataSourceConfig,
  ) {
    super(dsConfig);
  }
}
