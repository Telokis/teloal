import { BootMixin } from "@loopback/boot";
import { ApplicationConfig } from "@loopback/core";
import { HealthBindings, HealthComponent } from "@loopback/health";
import { MetricsBindings, MetricsComponent } from "@loopback/metrics";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication, RestBindings } from "@loopback/rest";
import { RestExplorerBindings, RestExplorerComponent } from "@loopback/rest-explorer";
import { ServiceMixin } from "@loopback/service-proxy";
import path from "path";
import { MySequence } from "./sequence";
import { CacheComponent } from "@teloal/lb4-cache";
import { CronComponent } from "@loopback/cron";
import { CronBooter } from "./booters/cron.booter";
import config from "config";

export { ApplicationConfig };

export class TeloAlApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.component(CacheComponent);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/swagger",
    });
    this.component(RestExplorerComponent);

    // Enable cron jobs
    this.component(CronComponent);

    // Add prometheus metrics
    this.configure(MetricsBindings.COMPONENT).to({
      endpoint: {
        basePath: "/metrics",
      },
      defaultMetrics: {
        timeout: 5000,
      },
      defaultLabels: {
        service: "api",
        version: "1.0.0",
      },
    });
    this.component(MetricsComponent);

    // Health checks
    this.configure(HealthBindings.COMPONENT).to({
      healthPath: "/h/health",
      livePath: "/h/live",
      readyPath: "/h/ready",
      openApiSpec: true,
    });
    this.component(HealthComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };

    if (!config.disableAllCrons) {
      // Register custom booter loading cronjobs
      this.booters(CronBooter);
    }
  }
}
