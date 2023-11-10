import { CompoundScrollKey, GItem, UpgradeScrollKey } from "typed-adventureland";

export function getItemGrade(gItem: GItem, level: number = 0) {
  if (!(gItem.upgrade || gItem.compound)) {
    return 0;
  }

  const grades = gItem.grades ?? [9, 10, 11, 12];

  if (level >= grades[3]) {
    return 4;
  }

  if (level >= grades[2]) {
    return 3;
  }

  if (level >= grades[1]) {
    return 2;
  }

  if (level >= grades[0]) {
    return 1;
  }

  return 0;
}

export function getPossibleScrolls(gItem: GItem, level: number = 0) {
  const grade = getItemGrade(gItem, level);
  const results: Array<UpgradeScrollKey | CompoundScrollKey> = [];

  if (gItem.upgrade) {
    if (grade <= 0) {
      results.push("scroll0");
    }
    if (grade <= 1) {
      results.push("scroll1");
    }
    if (grade <= 2) {
      results.push("scroll2");
    }
    if (grade <= 3) {
      results.push("scroll3");
    }
  } else if (gItem.compound) {
    if (grade <= 0) {
      results.push("cscroll0");
    }
    if (grade <= 1) {
      results.push("cscroll1");
    }
    if (grade <= 2) {
      results.push("cscroll2");
    }
    if (grade <= 3) {
      results.push("cscroll3");
    }
  }

  return results;
}
