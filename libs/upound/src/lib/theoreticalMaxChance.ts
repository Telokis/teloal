import {
  CompoundScrollKey,
  GData,
  ItemKey,
  OfferingKey,
  UpgradeScrollKey,
} from "typed-adventureland";
import { getItemGrade } from "./itemGrade";
import { baseCompoundChance, baseUpgradeChance } from "./baseChance";
import Debug = require("debug");

const debug = Debug("teloal:upound:theoreticalMaxChance");

export function theoreticalMaxUpgradeChance(
  G: GData,
  itemName: ItemKey,
  currentLevel: number,
  scrollName: UpgradeScrollKey,
  offeringName: null | OfferingKey = null,
) {
  if (currentLevel < 0 || currentLevel >= 12) {
    return 0;
  }

  const newLevel = currentLevel + 1;
  const gItem = G.items[itemName];
  const gScroll = G.items[scrollName];

  if (!gScroll || !gItem || !gItem.upgrade || typeof gScroll.grade !== "number") {
    return 0;
  }

  const grade = getItemGrade(gItem, currentLevel);
  const gradeLvl0 = getItemGrade(gItem, 0) as 0 | 1 | 2;

  const baseProbability = baseUpgradeChance[gradeLvl0][newLevel];
  let probability = baseProbability;

  /** Whether the scroll and/or offering is of higher quality than the item */
  let high = false;

  if (gScroll.grade > grade && newLevel <= 10) {
    probability = probability * 1.2 + 0.01;
    high = true;
  }

  if (offeringName) {
    const gOffering = G.items[offeringName];

    if (!gOffering || typeof gOffering.grade !== "number") {
      return 0;
    }

    if (gOffering.grade > grade + 1) {
      probability = probability * 1.7;
      high = true;
    } else if (gOffering.grade > grade) {
      probability = probability * 1.5;
      high = true;
    } else if (gOffering.grade === grade) {
      probability = probability * 1.4;
    } else if (gOffering.grade === grade - 1) {
      probability = probability * 1.15;
    } else {
      probability = probability * 1.08;
    }
  }

  let maxProbability = Math.min(1, baseProbability + 0.24, baseProbability * 2);

  if (high) {
    maxProbability = Math.min(1, baseProbability + 0.36, baseProbability * 3);
  }

  const minProbability = Math.min(probability, maxProbability);

  debug("Min prob: %d. Max prob: %d.", minProbability, maxProbability);

  return maxProbability;
}

export function theoreticalMaxCompoundChance(
  G: GData,
  itemName: ItemKey,
  currentLevel: number,
  scrollName: CompoundScrollKey,
  offeringName: null | OfferingKey = null,
) {
  if (currentLevel < 0 || currentLevel >= 12) {
    return 0;
  }

  const newLevel = currentLevel + 1;
  const gItem = G.items[itemName];
  const gScroll = G.items[scrollName];

  if (!gScroll || !gItem || !gItem.compound || typeof gScroll.grade !== "number") {
    return 0;
  }

  const grade = getItemGrade(gItem, currentLevel);
  let gradeLvl0 = getItemGrade(gItem, 0) as 0 | 1 | 2;

  if (currentLevel >= 3) {
    gradeLvl0 = getItemGrade(gItem, currentLevel - 2) as 0 | 1 | 2;
  }

  const baseProbability = baseCompoundChance[gradeLvl0][newLevel];
  let probability = baseProbability;

  /** Whether the scroll and/or offering is of higher quality than the item */
  let high = 0;

  if (gScroll.grade > grade) {
    probability = probability * 1.1 + 0.001;
    high = gScroll.grade - grade;
  }

  if (offeringName) {
    const gOffering = G.items[offeringName];

    if (!gOffering || typeof gOffering.grade !== "number") {
      return 0;
    }

    if (gOffering.grade > grade + 1) {
      probability = probability * 1.64;
      high = 1;
    } else if (gOffering.grade > grade) {
      probability = probability * 1.48;
      high = 1;
    } else if (gOffering.grade === grade) {
      probability = probability * 1.36;
    } else if (gOffering.grade === grade - 1) {
      probability = probability * 1.15;
    } else {
      probability = probability * 1.08;
    }
  }

  const maxProbability = Math.min(
    1,
    baseProbability * (3 + high * 0.6),
    baseProbability + 0.2 + high * 0.05,
  );

  const minProbability = Math.min(probability, maxProbability);
  debug("Min prob: %d. Max prob: %d.", minProbability, maxProbability);

  return maxProbability;
}

export function theoreticalMaxChance(
  G: GData,
  itemName: ItemKey,
  currentLevel: number,
  scrollName: UpgradeScrollKey | CompoundScrollKey,
  offeringName: null | OfferingKey = null,
) {
  const gItem = G.items[itemName];

  if (gItem.upgrade) {
    return theoreticalMaxUpgradeChance(
      G,
      itemName,
      currentLevel,
      scrollName as UpgradeScrollKey,
      offeringName,
    );
  }
  if (gItem.compound) {
    return theoreticalMaxCompoundChance(
      G,
      itemName,
      currentLevel,
      scrollName as CompoundScrollKey,
      offeringName,
    );
  }

  return 0;
}
