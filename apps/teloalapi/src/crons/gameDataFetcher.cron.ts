import { Application, CoreBindings, inject } from "@loopback/core";
import { CronJob, cronJob } from "@loopback/cron";
import { repository } from "@loopback/repository";
import config from "config";
import Debug from "debug";
import { AlGameDataRepository } from "../repositories/alGameData.repository";
import { AdventureLandService } from "../services/adventureLand.service";
import { byteSize, stableStringify } from "@teloal/helpers";
import { md5 } from "@teloal/pseudo-crypto";
import ms from "ms";
import { AlBindings } from "../keys/alGameData.keys";

const debug = Debug("teloal:cron:gamedatafetcher");

@cronJob()
export class GameDataFetcherCron extends CronJob {
  constructor(
    @inject("services.AdventureLand")
    alService: AdventureLandService,

    @repository(AlGameDataRepository)
    alGameDataRepo: AlGameDataRepository,

    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
  ) {
    const myConfig = config.crons.gameDataFetcher;

    debug("Enabled? %s", myConfig.enable);

    if (myConfig.enable) {
      debug("cron time: %s", myConfig.cronTime);
    }

    super({
      name: "GameDataFetcher",
      runOnInit: true,
      cronTime: myConfig.cronTime,
      start: myConfig.enable,

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onTick: async () => {
        const start = Date.now();

        debug("Retrieving AL game data.");
        const html = await alService.getDataPage();

        debug("Extracting json from js file.");
        let jsonString = html.trim().replace(/^[^{]+?(\{.*?\});$/i, "$1");
        debug("AL game data string is %s chars long.", byteSize(jsonString.length));

        debug("Parse json into memory.");
        const parsed = JSON.parse(jsonString);
        const version = parsed.version;
        debug("Game version is %d.", version);

        debug("Getting stable string");
        jsonString = stableStringify(parsed);

        debug("Getting hash of stable string");
        const fullHash = md5(jsonString);
        const hash = fullHash.substring(0, 8);
        debug("Hash is %s. Shortened to %s.", fullHash, hash);

        debug("Checking if the hash is already in DB");
        const exists = await alGameDataRepo.exists(hash);

        debug("Binding the game data in any case");
        app.bind(AlBindings.GAME_DATA).to(parsed);

        if (exists) {
          debug("The data already exists. Stopping there. Tick took %s", ms(Date.now() - start));
          return;
        }

        debug("Storing it in DB.");
        await alGameDataRepo.create({
          createdAt: new Date(),
          hash: hash,
          version: version,
          json: jsonString,
        });
        debug("Done. Tick took %s", ms(Date.now() - start));
      },
    });
  }
}
