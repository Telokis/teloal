import { Model, model, property } from "@loopback/repository";
import type { ItemInfo, ItemInfoPValues, ItemKey, StatType } from "typed-adventureland";

export type ALCharacterCleanSlot = Pick<ItemInfo, "name" | "level" | "p" | "stat_type">;

@model({
  settings: {
    description: "A publicly visible character item.",
  },
})
export class AlCharacterItem extends Model implements ALCharacterCleanSlot {
  @property({
    type: "string",
    description: "Name of the item.",
  })
  name: ItemKey;

  @property({
    type: "number",
    description: "Level of the item.",
    jsonSchema: {
      default: 0,
    },
  })
  level?: number;

  @property({
    type: "string",
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
    type: "string",
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

  constructor(data?: Partial<AlCharacterItem>) {
    super(data);
  }
}
