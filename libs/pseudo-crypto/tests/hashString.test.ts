import { hashString } from "../src/index";

describe("hashString", () => {
  it("should return a number", () => {
    const actual = hashString("My string to hash");

    expect(typeof actual).toBe("number");
  });

  it("should return the same hash for the same input", () => {
    const str = "My string to hash";
    const actual = hashString(str);
    const other = hashString(str);

    expect(actual).toStrictEqual(other);
  });

  it("should return different hashes for different seeds", () => {
    const str = "My string to hash";
    const actual = hashString(str);
    const other = hashString(str, 18);

    expect(actual).not.toStrictEqual(other);
  });

  it("should return different hashes for different inputs", () => {
    const actual = hashString("Test 1");
    const other = hashString("Test 2");

    expect(actual).not.toStrictEqual(other);
  });

  it("should work with an empty string", () => {
    const actual = hashString("");

    expect(actual).toMatchInlineSnapshot(`3338908027751811`);
  });
});
