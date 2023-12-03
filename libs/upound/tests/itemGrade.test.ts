import { GData } from "typed-adventureland";
import { getGData } from "../../../tools/test-utils";
import { getItemGrade } from "../src/index";

let G: GData;

beforeAll(async () => {
  G = await getGData();
}, 20000);

describe("itemGrade", () => {
  it("should return 0 for a lvl 0 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 0);

    expect(actual).toBe(0);
  });

  it("should return 1 for a lvl 0 molesteeth", () => {
    const actual = getItemGrade(G.items.molesteeth, 0);

    expect(actual).toBe(1);
  });

  it("should return 1 for a lvl 8 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 8);

    expect(actual).toBe(1);
  });

  it("should return 2 for a lvl 9 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 9);

    expect(actual).toBe(2);
  });

  it("should return 2 for a lvl 0 vhammer", () => {
    const actual = getItemGrade(G.items.vhammer, 0);

    expect(actual).toBe(2);
  });

  it("should return 3 for a lvl 10 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 10);

    expect(actual).toBe(3);
  });

  it("should return 4 for a lvl 12 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 12);

    expect(actual).toBe(4);
  });

  it("should return 4 for a lvl 13 ololipop", () => {
    const actual = getItemGrade(G.items.ololipop, 13);

    expect(actual).toBe(4);
  });
});
