import type {
  CompoundScrollKey,
  ItemKey,
  OfferingKey,
  UpgradeScrollKey,
} from "typed-adventureland";

export interface ScrollOverrides {
  // SCROLLS
  scroll0?: number;
  scroll1?: number;
  scroll2?: number;
  scroll3?: number;
  scroll4?: number;

  // CSCROLLS
  cscroll0?: number;
  cscroll1?: number;
  cscroll2?: number;
  cscroll3?: number;
}

export interface OfferingOverrides {
  offeringp?: number;
  offering?: number;
  offeringx?: number;
}

export type UpoundBothScrolls = UpgradeScrollKey | CompoundScrollKey;
export type UpoundBothOverrides = ScrollOverrides & OfferingOverrides;
export type UpoundModeType = "AVG" | "MIN" | "MAX" | "THEORETICAL_MAX";

export interface DataEntry {
  name: ItemKey;
  level: number;
  scroll: UpoundBothScrolls;
  offering: OfferingKey | null;
  sampleSize: number;
  avgChance: number;
  minChance: number;
  maxChance: number;
}

export interface UpoundPath {
  meta: {
    mode: UpoundModeType;
    item: {
      name: ItemKey;
      basePrice: number;
    };
    prices: Required<ScrollOverrides & OfferingOverrides>;
  };
  path: Record<
    number,
    {
      value: number;
      scroll: UpoundBothScrolls | null;
      offering: OfferingKey | null;
      chance: number;
      cumulatedChance: number;
      _human: string;
    }
  >;
}
