import type { GData, ItemKey, OfferingKey } from "typed-adventureland";
import { formatNumber, sleep } from "@teloal/helpers";

import rawData = require("../data.json");
import {
  DataEntry,
  OfferingOverrides,
  ScrollOverrides,
  UpoundBothOverrides,
  UpoundBothScrolls,
  UpoundModeType,
  UpoundPath,
} from "./types";
import { getPossibleScrolls } from "./itemGrade";
import { theoreticalMaxChance } from "./theoreticalMaxChance";
import Debug = require("debug");

const debug = Debug("teloal:upound:upound");

const data = rawData as Record<string, DataEntry>;

const SCROLL_COSTS = {
  // SCROLLS
  scroll0: 1_000,
  scroll1: 40_000,
  scroll2: 1_600_000,
  scroll3: 480_000_000,
  scroll4: 25_000_000_000,

  // CSCROLLS
  cscroll0: 6_400,
  cscroll1: 240_000,
  cscroll2: 9_200_000,
  cscroll3: 2_000_000_000,
};

const MODES = ["AVG", "MIN", "MAX", "THEORETICAL_MAX"];

// prettier-ignore
const OFFERINGS = {
  offeringp:   3_000_000,
  offering:   27_400_000,
  offeringx: 600_000_000,
};

export function getDefaultPrice(entry: string) {
  return (
    getOfferingPrice(entry as OfferingKey, {}) ||
    getScrollPrice(entry as UpoundBothScrolls, {}) ||
    0
  );
}

export function getOfferingPrice(
  offering: OfferingKey | null,
  overrides: OfferingOverrides = {},
): number {
  if (!offering) {
    return 0;
  }

  if (offering in overrides) {
    return overrides[offering]!;
  }

  if (offering in OFFERINGS) {
    return OFFERINGS[offering];
  }

  return 0;
}

export function getScrollPrice(
  scroll: UpoundBothScrolls | null,
  overrides: ScrollOverrides = {},
): number {
  if (!scroll) {
    return 0;
  }

  if (scroll in overrides) {
    return overrides[scroll]!;
  }

  if (scroll in SCROLL_COSTS) {
    return SCROLL_COSTS[scroll];
  }

  return 0;
}

// If the item to be upgraded has a value higher than the threshold, use the more expensive path, if not use the cheaper path.
// https://discord.com/channels/238332476743745536/243707345887166465/1138233353187901490
// https://cdn.discordapp.com/attachments/1045841454121111642/1139259485114863706/image.png
export function thresholdValue(
  chance1: number,
  upgradecost1: number,
  chance2: number,
  upgradecost2: number,
) {
  return (upgradecost1 * chance2 - upgradecost2 * chance1) / (chance1 - chance2);
}

/**
 * Determines the cost of upgrading with the specified parameters.
 *
 * @param currentValue The current value of the item, before upgrading.
 * @param chance The chance for the upgrade/compound to succeed.
 * @param scroll The scroll used for upgrade/compound.
 * @param offering The offering used for upgrade/compound. Can be null.
 * @returns The cost of the item after upgrading. If <= 0, an error occurred.
 */
export function computeNewCost(
  currentValue: number,
  chance: number,
  scroll: UpoundBothScrolls,
  offering: null | OfferingKey = null,
  overrides: UpoundBothOverrides = {},
) {
  let value = currentValue;
  const scrollPrice = getScrollPrice(scroll, overrides);
  const offeringPrice = getOfferingPrice(offering, overrides);

  if (scrollPrice === 0 || chance <= 0) {
    return -1;
  }

  if (scroll.startsWith("c")) {
    value *= 3;
  }

  const upgradeCost = scrollPrice + offeringPrice;

  return Math.ceil((value + upgradeCost) * (1 / chance));
}

interface CheapestUpgradeResult {
  value: number;
  scroll: UpoundBothScrolls;
  offering: null | OfferingKey;
  chance: number;
  cumulatedChance: number;
}

/**
 * Like getCheapestUpgrade but considers any possible scroll/offering combination
 * Based on the max computed chances.
 */
export async function getAbsoluteCheapestUpgrade(
  G: GData,
  itemName: ItemKey,
  itemLevel: number,
  currentValue: number,
  cumulatedChance: number,
  overrides: UpoundBothOverrides = {},
): Promise<CheapestUpgradeResult | null> {
  let result = null;

  for (const offering of [null, "offeringp", "offering", "offeringx"] as const) {
    for (const scroll of getPossibleScrolls(G.items[itemName], itemLevel)) {
      const chance = theoreticalMaxChance(G, itemName, itemLevel, scroll, offering);

      debug("Theoretical max chance: %d (%s %s) lvl %d", chance, scroll, offering, itemLevel);
      const newValue = computeNewCost(currentValue, chance, scroll, offering, overrides);

      if (newValue > 0 && (result === null || result.value > newValue)) {
        result = {
          value: newValue,
          scroll,
          offering,
          chance,
          cumulatedChance: cumulatedChance * chance,
        };
      }

      await sleep(1);
    }
  }

  return result;
}

/**
 * @param levelData All data to consider the prices and chances for.
 * @param currentValue The value of the item at the current level
 * @param cumulatedChance The cumulated chance of the item at the current level
 */
export async function getCheapestUpgrade(
  levelData: Array<DataEntry>,
  currentValue: number,
  cumulatedChance: number,
  mode: UpoundModeType,
  overrides: UpoundBothOverrides = {},
): Promise<CheapestUpgradeResult | null> {
  let result = null;
  let possibleValue: number;

  for (const { scroll, offering, avgChance, minChance, maxChance } of levelData) {
    possibleValue = currentValue;

    let chance = avgChance;

    if (mode === "MIN") {
      chance = minChance;
    } else if (mode === "MAX") {
      chance = maxChance;
    }

    possibleValue = computeNewCost(currentValue, chance, scroll, offering, overrides);

    if (possibleValue > 0 && (result === null || result.value > possibleValue)) {
      result = {
        value: possibleValue,
        scroll,
        offering,
        chance,
        cumulatedChance: cumulatedChance * chance,
      };
    }

    await sleep(1);
  }

  return result;
}

export interface GetUpoundPathOptions {
  G: GData;
  itemName: ItemKey;
  basePrice: number;
  mode?: UpoundModeType;
  overrides?: UpoundBothOverrides;
}

export async function getUpoundPath({
  G,
  itemName,
  basePrice,
  mode = "AVG",
  overrides = {},
}: GetUpoundPathOptions): Promise<UpoundPath> {
  mode = MODES.includes(mode) ? mode : "AVG";

  const result: UpoundPath = {
    meta: {
      mode: mode,
      item: {
        name: itemName,
        basePrice: basePrice,
      },
      prices: {
        ...SCROLL_COSTS,
        ...OFFERINGS,
        ...overrides,
      },
    },
    path: {
      0: {
        value: basePrice,
        scroll: null,
        offering: null,
        chance: 1,
        cumulatedChance: 1,
        _human: `${itemName} +0 is set to be worth ${formatNumber(basePrice)} gold.`,
      },
    },
  };

  const itemData = Object.values(data).filter((item) => item.name === itemName);

  for (let lvl = 0; lvl < 13; lvl++) {
    let cheapest: CheapestUpgradeResult | null = null;

    if (mode === "THEORETICAL_MAX") {
      cheapest = await getAbsoluteCheapestUpgrade(
        G,
        itemName,
        lvl,
        result.path[lvl].value,
        result.path[lvl].cumulatedChance,
        overrides,
      );
    } else {
      const levelData = itemData.filter((d) => d.level === lvl);
      cheapest = await getCheapestUpgrade(
        levelData,
        result.path[lvl].value,
        result.path[lvl].cumulatedChance,
        mode,
        overrides,
      );
    }

    // No data for this level, we stop there.
    if (!cheapest) {
      break;
    }

    const valueStr = formatNumber(cheapest.value);
    const chanceStr = (cheapest.chance * 100).toFixed(3);
    const cumulatedChanceStr = (cheapest.cumulatedChance * 100).toFixed(3);

    result.path[lvl + 1] = {
      ...cheapest,
      _human: `${itemName} +${
        lvl + 1
      } is worth at least ${valueStr} gold. Chance: ${chanceStr}% (cumulated: ${cumulatedChanceStr}%).`,
    };

    await sleep(1);
  }

  return result;
}
