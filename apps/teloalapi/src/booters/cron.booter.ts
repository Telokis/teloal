import { ArtifactOptions, BaseArtifactBooter, BootBindings, booter } from "@loopback/boot";
import { Application, config, CoreBindings, createBindingFromClass, inject } from "@loopback/core";

@booter("crons")
export class CronBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
    @config()
    public cronConfig: ArtifactOptions = {},
  ) {
    super(
      projectRoot,
      // Set Cron Booter Options if passed in via bootConfig
      Object.assign({}, CronDefaults, cronConfig),
    );
  }

  /**
   * Uses super method to get a list of Artifact classes. Boot each class by
   * binding it to the application using `app.cron(cron);`.
   */
  async load() {
    await super.load();
    this.classes.forEach((cls) => {
      this.app.add(createBindingFromClass(cls));
    });
  }
}

/**
 * Default ArtifactOptions for CronBooter.
 */
export const CronDefaults: ArtifactOptions = {
  dirs: ["crons"],
  extensions: [".cron.js"],
  nested: true,
};
