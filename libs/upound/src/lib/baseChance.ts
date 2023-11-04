export const baseUpgradeChance: Record<0 | 1 | 2, Record<number, number>> = {
  0: {
    1: 0.9999999,
    2: 0.98,
    3: 0.95,
    4: 0.7,
    5: 0.6,
    6: 0.4,
    7: 0.25,
    8: 0.15,
    9: 0.07,
    10: 0.024,
    11: 0.14,
    12: 0.11,
  },
  1: {
    1: 0.99998,
    2: 0.97,
    3: 0.94,
    4: 0.68,
    5: 0.58,
    6: 0.38,
    7: 0.24,
    8: 0.14,
    9: 0.066,
    10: 0.018,
    11: 0.13,
    12: 0.1,
  },
  2: {
    1: 0.97,
    2: 0.94,
    3: 0.92,
    4: 0.64,
    5: 0.52,
    6: 0.32,
    7: 0.232,
    8: 0.13,
    9: 0.062,
    10: 0.015,
    11: 0.12,
    12: 0.09,
  },
};

export const baseCompoundChance: Record<0 | 1 | 2, Record<number, number>> = {
  0: {
    1: 0.99,
    2: 0.75,
    3: 0.4,
    4: 0.25,
    5: 0.2,
    6: 0.1,
    7: 0.08,
    8: 0.05,
    9: 0.05,
    10: 0.05,
  },
  1: {
    1: 0.9,
    2: 0.7,
    3: 0.4,
    4: 0.2,
    5: 0.15,
    6: 0.08,
    7: 0.05,
    8: 0.05,
    9: 0.05,
    10: 0.03,
  },
  2: {
    1: 0.8,
    2: 0.6,
    3: 0.32,
    4: 0.16,
    5: 0.1,
    6: 0.05,
    7: 0.03,
    8: 0.03,
    9: 0.03,
    10: 0.02,
  },
};
