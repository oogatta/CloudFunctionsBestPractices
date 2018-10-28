import { test } from "../src/index";
import { expect } from "chai";
import "mocha";

describe("test functions", () => {
  it("should return 1.", () => {
    expect(test()).to.equal(1);
  });
});