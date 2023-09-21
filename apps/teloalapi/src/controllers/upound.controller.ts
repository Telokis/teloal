import { JsonSchema, api, get, getModelSchemaRef, param, response } from "@loopback/rest";
import {
  OfferingOverrides,
  ScrollOverrides,
  UpoundModeType,
  UpoundPath,
  UpoundPathModel,
  getDefaultPrice,
  getUpoundPath,
} from "@teloal/upound";
import type { ItemKey } from "typed-adventureland";

function makeOverrideSpec(name: string) {
  return {
    type: "number",
    description: `Overrides the default price of a single ${name}.`,
    default: getDefaultPrice(name),
  };
}

@api({ basePath: "/v1/upound" })
export class UpoundController {
  @get("/")
  @response(200, {
    description:
      "Computes the optimal upgrade or compound path based for the specified item. The algorithm is based on the collected data of several AL players.",
    content: {
      "application/json": {
        schema: getModelSchemaRef(UpoundPathModel),
      },
    },
  })
  async getUpoundPath(
    @param.query.string("item", {
      required: true,
      description: "Name of the item you want to compute the path for.",
    })
    itemName: ItemKey,
    @param.query.number("price", {
      required: true,
      description: "Price of the item you want to compute the path for at level 0.",
    })
    itemBasePrice: number,
    @param.query.string("mode", {
      description:
        "How to compute the price. AVG uses the average chance, MIN uses the min chance and MAX uses the max chance.",
      default: "AVG",
      schema: {
        type: "string",
        enum: ["AVG", "MIN", "MAX"],
      },
    })
    mode?: UpoundModeType,

    @param.query.number("offeringp", makeOverrideSpec("offeringp")) offeringp?: number,
    @param.query.number("offering", makeOverrideSpec("offering")) offering?: number,
    @param.query.number("offeringx", makeOverrideSpec("offeringx")) offeringx?: number,
    @param.query.number("scroll0", makeOverrideSpec("scroll0")) scroll0?: number,
    @param.query.number("scroll1", makeOverrideSpec("scroll1")) scroll1?: number,
    @param.query.number("scroll2", makeOverrideSpec("scroll2")) scroll2?: number,
    @param.query.number("scroll3", makeOverrideSpec("scroll3")) scroll3?: number,
    @param.query.number("scroll4", makeOverrideSpec("scroll4")) scroll4?: number,
    @param.query.number("cscroll0", makeOverrideSpec("cscroll0")) cscroll0?: number,
    @param.query.number("cscroll1", makeOverrideSpec("cscroll1")) cscroll1?: number,
    @param.query.number("cscroll2", makeOverrideSpec("cscroll2")) cscroll2?: number,
    @param.query.number("cscroll3", makeOverrideSpec("cscroll3")) cscroll3?: number,
  ): Promise<UpoundPath> {
    const overrides: ScrollOverrides & OfferingOverrides = {};

    // Set all overrides values if specified
    if (offeringp) overrides.offeringp = offeringp;
    if (offering) overrides.offering = offering;
    if (offeringx) overrides.offeringx = offeringx;
    if (scroll0) overrides.scroll0 = scroll0;
    if (scroll1) overrides.scroll1 = scroll1;
    if (scroll2) overrides.scroll2 = scroll2;
    if (scroll3) overrides.scroll3 = scroll3;
    if (scroll4) overrides.scroll4 = scroll4;
    if (cscroll0) overrides.cscroll0 = cscroll0;
    if (cscroll1) overrides.cscroll1 = cscroll1;
    if (cscroll2) overrides.cscroll2 = cscroll2;
    if (cscroll3) overrides.cscroll3 = cscroll3;

    const result = await getUpoundPath({
      itemName,
      basePrice: itemBasePrice,
      mode: mode?.toUpperCase() as UpoundModeType | undefined,
      overrides,
    });

    return result;
  }
}
