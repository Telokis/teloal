import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
import config from "config";

const connectorConfig = {
  name: "mongo",
  connector: "mongodb",
  host: config.mongo.host,
  port: config.mongo.port,
  user: config.mongo.user,
  password: config.mongo.password,
  database: config.mongo.database,
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class MongoDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = "mongo";
  static readonly defaultConfig = connectorConfig;

  constructor(
    @inject("datasources.config.mongo", { optional: true })
    dsConfig: object = connectorConfig,
  ) {
    super(dsConfig);
  }
}
