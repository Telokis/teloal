import { BindingKey } from "@loopback/core";
import type { GData } from "typed-adventureland";

export namespace AlBindings {
  export const GAME_DATA = BindingKey.create<GData | undefined>("teloal.alGameData");
}
