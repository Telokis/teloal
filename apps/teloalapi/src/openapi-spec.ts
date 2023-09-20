import { ApplicationConfig } from "@loopback/core";
import { TeloAlApiApplication } from "./application";
import config from "config";

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const appConfig: ApplicationConfig = {
    rest: {
      port: config.port,
      host: config.host,
    },
  };

  const outFile = process.argv[2] ?? "";
  const app = new TeloAlApiApplication(appConfig);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch((err) => {
  console.error("Fail to export OpenAPI spec from the application.", err);
  process.exit(1);
});
