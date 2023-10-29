import {
  CompoundScrollKey,
  GData,
  ItemKey,
  OfferingKey,
  UpgradeScrollKey,
} from "typed-adventureland";
import { getItemGrade } from "./itemGrade";
import { baseCompoundChance, baseUpgradeChance } from "./baseChance";

export function maxUpgradeChance(
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

  /** Whether the scroll and/or offering is of higher quality than the item */
  let high = false;

  if (gScroll.grade > grade && newLevel <= 10) {
    high = true;
  }

  if (offeringName) {
    const gOffering = G.items[offeringName];

    if (!gOffering || typeof gOffering.grade !== "number") {
      return 0;
    }

    if (gOffering.grade > grade + 1) {
      high = true;
    } else if (gOffering.grade > grade) {
      high = true;
    }
  }

  if (high) {
    return Math.min(baseProbability + 0.36, baseProbability * 3);
  }

  return Math.min(baseProbability + 0.24, baseProbability * 2);
}

export function maxCompoundChance(
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

  /** Whether the scroll and/or offering is of higher quality than the item */
  let high = 0;

  if (gScroll.grade > grade) {
    high = gScroll.grade - grade;
  }

  if (offeringName) {
    const gOffering = G.items[offeringName];

    if (!gOffering || typeof gOffering.grade !== "number") {
      return 0;
    }

    if (gOffering.grade > grade + 1) {
      high = 1;
    } else if (gOffering.grade > grade) {
      high = 1;
    }
  }

  return Math.min(baseProbability * (3 + high * 0.6), baseProbability + 0.2 + high * 0.05);
}
