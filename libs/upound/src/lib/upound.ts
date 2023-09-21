import type { ItemKey, OfferingKey } from "typed-adventureland";
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

const MODES = ["AVG", "MIN", "MAX"];

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
) {
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

    const scrollPrice = getScrollPrice(scroll, overrides);
    const offeringPrice = getOfferingPrice(offering, overrides);

    if (scrollPrice === 0) {
      continue;
    }

    if (scroll.startsWith("c")) {
      possibleValue *= 3;
    }

    const upgradeCost = scrollPrice + offeringPrice;

    possibleValue = Math.ceil((possibleValue + upgradeCost) * (1 / chance));

    if (result === null || result.value > possibleValue) {
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
  itemName: ItemKey;
  basePrice: number;
  mode?: UpoundModeType;
  overrides?: UpoundBothOverrides;
}

export async function getUpoundPath({
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
        consideredPermutations: 1,
        _human: `${itemName} +0 is set to be worth ${formatNumber(basePrice)} gold.`,
      },
    },
  };

  const itemData = Object.values(data).filter((item) => item.name === itemName);

  for (let lvl = 0; lvl < 13; lvl++) {
    const levelData = itemData.filter((d) => d.level === lvl);
    const cheapest = await getCheapestUpgrade(
      levelData,
      result.path[lvl].value,
      result.path[lvl].cumulatedChance,
      mode,
      overrides,
    );

    // No data for this level, we stop there.
    if (!cheapest) {
      break;
    }

    const valueStr = formatNumber(cheapest.value);
    const chanceStr = (cheapest.chance * 100).toFixed(3);
    const cumulatedChanceStr = (cheapest.cumulatedChance * 100).toFixed(3);

    result.path[lvl + 1] = {
      ...cheapest,
      consideredPermutations: levelData.length,
      _human: `${itemName} +${
        lvl + 1
      } is worth at least ${valueStr} gold. Chance: ${chanceStr}% (cumulated: ${cumulatedChanceStr}%).`,
    };

    await sleep(1);
  }

  return result;
}
