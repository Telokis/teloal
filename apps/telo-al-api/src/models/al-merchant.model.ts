import { Model, model, property } from "@loopback/repository";
import type { MapKey } from "typed-adventureland";
import { AlMerchantsEntry } from "../types/AlMerchants";
import { AlMerchantTradeEntry } from "./al-merchant-trade-entry.model";

@model()
export class AlMerchantTradeSlots extends Model {
  @property()
  trade1?: AlMerchantTradeEntry;

  @property()
  trade2?: AlMerchantTradeEntry;

  @property()
  trade3?: AlMerchantTradeEntry;

  @property()
  trade4?: AlMerchantTradeEntry;

  @property()
  trade5?: AlMerchantTradeEntry;

  @property()
  trade6?: AlMerchantTradeEntry;

  @property()
  trade7?: AlMerchantTradeEntry;

  @property()
  trade8?: AlMerchantTradeEntry;

  @property()
  trade9?: AlMerchantTradeEntry;

  @property()
  trade10?: AlMerchantTradeEntry;

  @property()
  trade11?: AlMerchantTradeEntry;

  @property()
  trade12?: AlMerchantTradeEntry;

  @property()
  trade13?: AlMerchantTradeEntry;

  @property()
  trade14?: AlMerchantTradeEntry;

  @property()
  trade15?: AlMerchantTradeEntry;

  @property()
  trade16?: AlMerchantTradeEntry;

  @property()
  trade17?: AlMerchantTradeEntry;

  @property()
  trade18?: AlMerchantTradeEntry;

  @property()
  trade19?: AlMerchantTradeEntry;

  @property()
  trade20?: AlMerchantTradeEntry;

  @property()
  trade21?: AlMerchantTradeEntry;

  @property()
  trade22?: AlMerchantTradeEntry;

  @property()
  trade23?: AlMerchantTradeEntry;

  @property()
  trade24?: AlMerchantTradeEntry;

  @property()
  trade25?: AlMerchantTradeEntry;

  @property()
  trade26?: AlMerchantTradeEntry;

  @property()
  trade27?: AlMerchantTradeEntry;

  @property()
  trade28?: AlMerchantTradeEntry;

  @property()
  trade29?: AlMerchantTradeEntry;

  @property()
  trade30?: AlMerchantTradeEntry;
}

@model({
  settings: {
    description: "A publicly visible character.",
  },
  jsonSchema: {
    required: ["name", "level", "map", "x", "y", "server", "slots"],
  },
})
export class AlMerchant extends Model implements AlMerchantsEntry {
  @property({
    description: "Name of the merchant.",
  })
  name: string;

  @property({
    description: "Level of the merchant.",
  })
  level: number;

  @property({
    description: "Currently traded items.",
  })
  slots: AlMerchantTradeSlots;

  @property({
    description: "Current map of the merchant.",
    jsonSchema: {
      example: "main",
    },
  })
  map: MapKey;

  @property({
    description: "Current x coordinate of the merchant.",
  })
  x: number;
  @property({
    description: "Current y coordinate of the merchant.",
  })
  y: number;

  @property({
    description: "Cosmetic information.",
    jsonSchema: {
      properties: {
        hair: { type: "string" },
        head: { type: "string" },
        makeup: { type: "string" },
      },
    },
  })
  cx: {
    hair: string;
    head: string;
    makeup: string;
  };

  @property({
    description: "Character appearance.",
  })
  skin: string;

  @property()
  afk: string;

  @property({
    description: "Current server.",
    jsonSchema: {
      example: "US III",
    },
  })
  server: string;

  @property({
    description: "Type of stand being used.",
  })
  stand: string;

  constructor(data?: Partial<AlMerchant>) {
    super(data);
  }
}
