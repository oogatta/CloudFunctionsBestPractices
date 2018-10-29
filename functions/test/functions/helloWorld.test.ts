import * as FunctionsTest from "firebase-functions-test";
import helloWorld from "../../typescript/functions/helloWorld";
import { expect } from "chai";
import "mocha";
import {Request, Response} from "express";

FunctionsTest().mockConfig({});

// TODO: Realtime Database トリガーの関数とテスト
// TODO: Firestore トリガーの関数とテスト
// TODO: Storage トリガーの関数とテスト

describe("helloWorld function", () => {
  it("should say hello.", () => {
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
