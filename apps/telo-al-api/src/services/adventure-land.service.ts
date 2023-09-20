import { inject, Provider } from "@loopback/core";
import { getService } from "@loopback/service-proxy";
import { AdventureLandDataSource } from "../datasources";

export interface AdventureLandService {
  getCharacterPage(name: string): Promise<string>;
  getPlayerPage(name: string): Promise<string>;
  getCharactersPage(): Promise<string>;

  /** Retrieves the html source of the page listing all currently online merchants. */
  getMerchantsPage(): Promise<string>;

  /** Retrieves the json listing all currently trading merchants and their goods. */
  getMerchants(): Promise<string>;

  getDataPage(): Promise<string>;
}

export class AdventureLandProvider implements Provider<AdventureLandService> {
  constructor(
    // AdventureLand must match the name property in the datasource json file
    @inject("datasources.AdventureLand")
    protected dataSource: AdventureLandDataSource = new AdventureLandDataSource(),
  ) {}

  value(): Promise<AdventureLandService> {
    return getService(this.dataSource);
  }
}
