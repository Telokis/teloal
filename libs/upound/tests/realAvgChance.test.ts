import { GData } from "typed-adventureland";
import { getGData } from "../../../tools/test-utils";
import { theoreticalMaxChance } from "../src/index";

let G: GData;

beforeAll(async () => {
  G = await getGData();
});

describe("realAvgUpgradeChance", () => {
  it("should return 0.48 for a harbringer lvl 6 with rare scroll and offering", () => {
    const actual = theoreticalMaxChance(G, "harbringer", 6, "scroll2", "offering");

    expect(actual).toBe(0.48);
  });
});
