import { Entity, Model, model, property } from "@loopback/repository";
import type { ClassKey, SlotType } from "typed-adventureland";
import { ALCharacterCleanSlot, AlCharacterItem } from "./al-character-item.model";

export interface ALCharacterDefinition {
  name: string;
  ctype: ClassKey;
  level: number;
  slots: Partial<Record<SlotType, ALCharacterCleanSlot>>;
}

@model({
  settings: {
    description: "The gear information. Each entry is optional.",
  },
})
export class AlCharacterItemSlots extends Model {
  @property()
  amulet?: AlCharacterItem;

  @property()
  belt?: AlCharacterItem;

  @property()
  cape?: AlCharacterItem;

  @property()
  chest?: AlCharacterItem;

  @property()
  earring1?: AlCharacterItem;

  @property()
  earring2?: AlCharacterItem;

  @property()
  elixir?: AlCharacterItem;

  @property()
  gloves?: AlCharacterItem;

  @property()
  helmet?: AlCharacterItem;

  @property()
  mainhand?: AlCharacterItem;

  @property()
  offhand?: AlCharacterItem;

  @property()
  orb?: AlCharacterItem;

  @property()
  pants?: AlCharacterItem;

  @property()
  ring1?: AlCharacterItem;

  @property()
  ring2?: AlCharacterItem;

  @property()
  shoes?: AlCharacterItem;
}

@model({
  settings: {
    description: "A publicly visible character.",
  },
  jsonSchema: {
    required: ["name", "level", "ctype", "slots"],
  },
})
export class AlCharacter extends Entity implements ALCharacterDefinition {
  @property({
    id: true,
    description: "Name of the character.",
  })
  name: string;

  @property({
    description: "Level of the character.",
  })
  level: number;

  @property({
    description: "Class of the character.",
    jsonSchema: {
      enum: ["mage", "merchant", "paladin", "priest", "ranger", "rogue", "warrior"],
    },
  })
  ctype: ClassKey;

  @property({
    description: "Currently equipped items.",
  })
  slots: AlCharacterItemSlots;

  constructor(data?: Partial<AlCharacter>) {
    super(data);
  }
}

export interface AlCharacterRelations {
  // describe navigational properties here
}

export type AlCharacterWithRelations = AlCharacter & AlCharacterRelations;
