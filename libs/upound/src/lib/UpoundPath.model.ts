import { JsonSchema, Model, model, property } from "@loopback/repository";
import type { ItemKey, OfferingKey } from "typed-adventureland";
import {
  UpoundPath,
  UpoundModeType,
  ScrollOverrides,
  OfferingOverrides,
  UpoundBothScrolls,
} from "./types";
import { getDefaultPrice } from "./upound";

function makeOverrideSpec(name: string): JsonSchema {
  return {
    type: "number",
    description: `Price of a single ${name}.`,
    examples: [getDefaultPrice(name)],
  };
}

const pathSpec: JsonSchema = {
  type: "object",
  required: ["value", "scroll", "offering", "chance", "cumulatedChance", "_human"],
  properties: {
    value: {
      type: "number",
      description: "Computed value of the item at the current level.",
      examples: [1_000_000],
    },
    scroll: {
      type: ["string", "null"],
      description: "Scroll used to reach the current level. Can only be null for lvl 0.",
      examples: ["scroll1", "cscroll2"],
      enum: [
        "scroll0",
        "scroll1",
        "scroll2",
        "scroll3",
        "scroll4",
        "cscroll0",
        "cscroll1",
        "cscroll2",
        "cscroll3",
      ],
    },
    offering: {
      type: ["string", "null"],
      description: "Offering used to reach the current level. If null, no offering was used.",
      examples: ["offeringp", "null"],
      enum: ["offeringp", "offering", "offeringx"],
    },
    chance: {
      type: "number",
      description: "Probability to reach the current level from the previous one.",
      examples: [0.48],
      minimum: 0,
      maximum: 1,
    },
    cumulatedChance: {
      type: "number",
      description: "Probability to reach the current level from a lvl 0 item.",
      examples: [0.48],
      minimum: 0,
      maximum: 1,
    },
    _human: {
      type: "string",
      description: "A human-readable string summarizing the entry of the current level.",
      examples: [
        "cring +2 is worth at least 27,799,945 gold. Chance: 90.000% (cumulated: 81.073%).",
        "cring +0 is set to be worth 12,150,000 gold.",
      ],
    },
  },
};

@model({
  settings: {
    description: "A publicly visible character item.",
  },
  jsonSchema: {
    required: ["mode", "item", "prices"],
  },
})
class UpoundPathMetaModel extends Model {
  @property({
    jsonSchema: {
      type: "string",
      default: "AVG",
      enum: ["MAX", "AVG", "MIN"],
    },
  })
  mode: UpoundModeType;

  @property({
    description: "Informations about the input item",
    jsonSchema: {
      required: ["name", "basePrice"],
      properties: {
        name: {
          type: "string",
          description: "Name of the requested item",
          examples: ["daggerofthedead", "mittens", "cring"],
        },
        basePrice: {
          type: "number",
          description: "Base price of the item used for calculations",
          examples: [1_000_000],
        },
      },
    },
  })
  item: {
    name: ItemKey;
    basePrice: number;
  };

  @property({
    description: "Informations about the prices used for all calculations",
    jsonSchema: {
      required: [
        "scroll0",
        "scroll1",
        "scroll2",
        "scroll3",
        "scroll4",
        "cscroll0",
        "cscroll1",
        "cscroll2",
        "cscroll3",
        "offeringp",
        "offering",
        "offeringx",
      ],
      properties: {
        scroll0: makeOverrideSpec("scroll0"),
        scroll1: makeOverrideSpec("scroll1"),
        scroll2: makeOverrideSpec("scroll2"),
        scroll3: makeOverrideSpec("scroll3"),
        scroll4: makeOverrideSpec("scroll4"),
        cscroll0: makeOverrideSpec("cscroll0"),
        cscroll1: makeOverrideSpec("cscroll1"),
        cscroll2: makeOverrideSpec("cscroll2"),
        cscroll3: makeOverrideSpec("cscroll3"),
        offeringp: makeOverrideSpec("offeringp"),
        offering: makeOverrideSpec("offering"),
        offeringx: makeOverrideSpec("offeringx"),
      },
    },
  })
  prices: Required<ScrollOverrides & OfferingOverrides>;
}

@model({
  settings: {
    description: "The recommended upgrade path based on the analyzed data.",
  },
  jsonSchema: {
    required: ["meta", "path"],
  },
})
export class UpoundPathModel extends Model implements UpoundPath {
  @property({
    description: "Information about the configuration used by the algorithm.",
  })
  meta: UpoundPathMetaModel;

  @property({
    description:
      "Most cost efficient path to follow to upgrade or compound, based on the stored data.",
    jsonSchema: {
      required: ["0"],
      properties: {
        0: pathSpec,
        1: pathSpec,
        2: pathSpec,
        3: pathSpec,
        4: pathSpec,
        5: pathSpec,
        6: pathSpec,
        7: pathSpec,
        8: pathSpec,
        9: pathSpec,
        10: pathSpec,
        11: pathSpec,
        12: pathSpec,
      },
    },
  })
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

  constructor(data?: Partial<UpoundPathModel>) {
    super(data);
  }
}
