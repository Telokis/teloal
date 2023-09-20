import { RestServer } from "@loopback/rest";
import { validateApiSpec } from "@loopback/testlab";
import { TeloAlApiApplication } from "../../src/application";

describe("API specification", () => {
  it("api spec is valid", async () => {
    const app = new TeloAlApiApplication();
    const server = await app.getServer(RestServer);
    const spec = await server.getApiSpec();

    await validateApiSpec(spec);
  });
});
