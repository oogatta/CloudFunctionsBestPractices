import * as FunctionsTest from "firebase-functions-test";
import { test, helloWorld } from "../src";
import { expect } from "chai";
import "mocha";
import {Request, Response} from "express";

FunctionsTest().mockConfig({});

describe("helloWorld function", () => {
  it("test", () => {
    const request = {};
    const response = {
      send: (body) => {
        expect(body).to.equal("Hello from Firebase!");
        return this;
      }
    };
    helloWorld(request as Request, response as Response);
  });
});

describe("test function", () => {
  it("should return 1.", () => {
    expect(test()).to.equal(1);
  });
});