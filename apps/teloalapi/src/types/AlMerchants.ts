import type {
  ItemKey,
  MapKey,
  ItemInfoPValues,
  TradeSlotType,
  StatType,
} from "typed-adventureland";

export type AlMerchantTradeSlot = {
  name: ItemKey;
  level?: number;
  rid: string;
  price: number;
  q?: number;
  b?: true;
  p?: ItemInfoPValues;
  stat_type?: StatType;
};

export type AlMerchantsEntry = {
  map: MapKey;
  cx: {
    hair: string;
    head: string;
    makeup: string;
  };
  skin: string;
  slots: {
    trade1?: AlMerchantTradeSlot;
    trade2?: AlMerchantTradeSlot;
    trade3?: AlMerchantTradeSlot;
    trade4?: AlMerchantTradeSlot;
    trade5?: AlMerchantTradeSlot;
    trade6?: AlMerchantTradeSlot;
    trade7?: AlMerchantTradeSlot;
    trade8?: AlMerchantTradeSlot;
    trade9?: AlMerchantTradeSlot;
    trade10?: AlMerchantTradeSlot;
    trade11?: AlMerchantTradeSlot;
    trade12?: AlMerchantTradeSlot;
    trade13?: AlMerchantTradeSlot;
    trade14?: AlMerchantTradeSlot;
    trade15?: AlMerchantTradeSlot;
    trade16?: AlMerchantTradeSlot;
    trade17?: AlMerchantTradeSlot;
    trade18?: AlMerchantTradeSlot;
    trade19?: AlMerchantTradeSlot;
    trade20?: AlMerchantTradeSlot;
    trade21?: AlMerchantTradeSlot;
    trade22?: AlMerchantTradeSlot;
    trade23?: AlMerchantTradeSlot;
    trade24?: AlMerchantTradeSlot;
    trade25?: AlMerchantTradeSlot;
    trade26?: AlMerchantTradeSlot;
    trade27?: AlMerchantTradeSlot;
    trade28?: AlMerchantTradeSlot;
    trade29?: AlMerchantTradeSlot;
    trade30?: AlMerchantTradeSlot;
  };
  name: string;
  level: number;
  afk: string;
  server: string;
  stand: string;
  y: number;
  x: number;
};

export type AlMerchants = [
  {
    chars: Array<AlMerchantsEntry>;
  },
];
