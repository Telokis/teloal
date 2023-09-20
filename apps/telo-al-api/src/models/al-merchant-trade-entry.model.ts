import { Model, model, property } from "@loopback/repository";
import type { ItemInfo, ItemInfoPValues, ItemKey, StatType } from "typed-adventureland";
import { AlMerchantTradeSlot } from "../types/AlMerchants";

export type ALCharacterCleanSlot = Pick<ItemInfo, "name" | "level" | "p" | "stat_type">;

@model({
  settings: {
    description: "A merchant trade entry.",
  },
  jsonSchema: {
    required: ["name", "price", "rid"],
  },
})
export class AlMerchantTradeEntry extends Model implements AlMerchantTradeSlot {
  @property({
    description: "Name of the item.",
  })
  name: ItemKey;

  @property({
    description: "Identifier for the trade entry.",
  })
  rid: string;

  @property({
    description: "Trade price in gold.",
  })
  price: number;

  @property({
    description:
      "If set to true, the current trade entry is a buy order. Otherwise, it's a sell order.",
  })
  b?: true;

  @property({
    description: "Level of the item.",
  })
  level?: number;

  @property({
    description: "Special modifier.",
    jsonSchema: {
      enum: [
        "festive",
        "firehazard",
        "glitched",
        "gooped",
        "legacy",
        "lucky",
        "shiny",
        "superfast",
      ],
    },
  })
  p?: ItemInfoPValues;

  @property({
    description: "Stat scroll used.",
    jsonSchema: {
      enum: [
        "armor",
        "attack",
        "dex",
        "for",
        "frequency",
        "gold",
        "xp",
        "hp",
        "mp",
        "int",
        "lifesteal",
        "luck",
        "mp_cost",
        "mp_reduction",
        "range",
        "resistance",
        "speed",
        "str",
        "vit",
        "stat",
        "evasion",
        "reflection",
        "manasteal",
        "rpiercing",
        "apiercing",
        "crit",
        "dreturn",
        "output",
      ],
    },
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  stat_type?: StatType;

  constructor(data?: Partial<AlMerchantTradeEntry>) {
    super(data);
  }
}
