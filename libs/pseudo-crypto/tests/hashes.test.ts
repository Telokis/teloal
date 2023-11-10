import { md5, sha256 } from "../src/index";

describe("md5", () => {
  it("should return a string", () => {
    const actual = md5("My string to hash");

    expect(typeof actual).toBe("string");
    expect(actual).toMatchInlineSnapshot(`"727d72e64c2a5181ee4803f84cc3d570"`);
  });

  it("should return the same hash for the same input", () => {
    const str = "My string to hash";
    const actual = md5(str);
    const other = md5(str);

    expect(actual).toStrictEqual(other);
  });

  it("should return different hashes for different inputs", () => {
    const actual = md5("Test 1");
    const other = md5("Test 2");

    expect(actual).not.toStrictEqual(other);
  });

  it("should work with an empty string", () => {
    const actual = md5("");

    expect(actual).toMatchInlineSnapshot(`"d41d8cd98f00b204e9800998ecf8427e"`);
  });
});

describe("sha256", () => {
  it("should return a string", () => {
    const actual = sha256("My string to hash");

    expect(typeof actual).toBe("string");
    expect(actual).toMatchInlineSnapshot(
      `"02fce9655c9228d48ff303bbf442c5045a0b2b07131a15bbb9bd9002b233d027"`,
    );
  });

  it("should return the same hash for the same input", () => {
    const str = "My string to hash";
    const actual = sha256(str);
    const other = sha256(str);

    expect(actual).toStrictEqual(other);
  });

  it("should return different hashes for different inputs", () => {
    const actual = sha256("Test 1");
    const other = sha256("Test 2");

    expect(actual).not.toStrictEqual(other);
  });

  it("should work with an empty string", () => {
    const actual = sha256("");

    expect(actual).toMatchInlineSnapshot(
      `"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"`,
    );
  });
});
