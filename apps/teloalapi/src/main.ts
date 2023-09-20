import { ApplicationConfig, TeloAlApiApplication } from "./application";
import config from "config";

export * from "./application";

export async function main(options: ApplicationConfig = {}) {
  const app = new TeloAlApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

// Run the application
const restConfig = {
  rest: {
    port: config.port,
    host: config.host,
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  },
};

main(restConfig).catch((err) => {
  console.error("Cannot start the application.", err);
  process.exit(1);
});
