import { GItem } from "typed-adventureland";

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
