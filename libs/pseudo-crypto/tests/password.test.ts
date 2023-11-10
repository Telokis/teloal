import { sprinklePassword, hashPassword, comparePassword } from "../src/index";

describe("sprinklePassword", () => {
  it("should return a string", () => {
    const actual = sprinklePassword("password", "pepper");

    expect(typeof actual).toBe("string");
  });

  it("should be consistent", () => {
    const pass = "password";
    const pepper = "pepper";

    const first = sprinklePassword(pass, pepper);
    const second = sprinklePassword(pass, pepper);

    expect(first).toStrictEqual(second);
  });

  it("should vary if pepper varies", () => {
    const pass = "password";

    const first = sprinklePassword(pass, "pepper 1");
    const second = sprinklePassword(pass, "pepper 2");

    expect(first).not.toStrictEqual(second);
  });

  it("should vary if password varies", () => {
    const pepper = "pepper";

    const first = sprinklePassword("pass 1", pepper);
    const second = sprinklePassword("pass 2", pepper);

    expect(first).not.toStrictEqual(second);
  });
});

describe("hashPassword", () => {
  it("should return a string", async () => {
    const actual = await hashPassword("password", 8, "pepper");

    expect(typeof actual).toBe("string");
  });
});

describe("comparePassword", () => {
  it("should return a boolean", async () => {
    const actual = await comparePassword("p1", "p2", "pepper");

    expect(typeof actual).toBe("boolean");
  });

  it("should return false with invalid hash", async () => {
    const actual = await comparePassword("p1", "p2", "pepper");

    expect(actual).toBe(false);
  });

  it("should return false when password doesn't match", async () => {
    const hash = await hashPassword("password", 8, "pepper");
    const actual = await comparePassword("p1", hash, "pepper");

    expect(actual).toBe(false);
  });

  it("should return false when pepper doesn't match", async () => {
    const hash = await hashPassword("password", 8, "pepper");
    const actual = await comparePassword("password", hash, "pepper 2");

    expect(actual).toBe(false);
  });

  it("should return true when everything matches", async () => {
    const pass = "password";
    const pepper = "pepper";

    const hash = await hashPassword(pass, 8, pepper);
    const actual = await comparePassword(pass, hash, pepper);

    expect(actual).toBe(true);
  });
});
