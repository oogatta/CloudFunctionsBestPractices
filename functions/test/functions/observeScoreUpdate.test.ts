import "mocha";
import {expect} from "chai";
import sinon = require("sinon");

import * as FunctionsTest from "firebase-functions-test";
const test = FunctionsTest();
test.mockConfig({});

import observeScoreUpdate from "../../typescript/functions/observeScoreUpdate";
import pushNotification from "../../typescript/lib/pushNotification";

describe("observeScoreUpdate function", () => {
  let send;
  before(() => {
    send = sinon.stub(pushNotification, "send");
  });

  after(() => {
    send.restore();
    test.cleanup();
  });

  afterEach(() => {
    send.reset();
  });

  it("should send a push notification on 5 score up.", () => {
    const wrappedObserveScoreUpdate = test.wrap(observeScoreUpdate);

    const beforeDocumentSnapshot = test.database
      .makeDataSnapshot({ score: 10 }, "user-score/oogatta");

    const afterDocumentSnapshot = test.database
      .makeDataSnapshot({ score: 15 }, "user-score/oogatta");

    const change = test.makeChange(beforeDocumentSnapshot, afterDocumentSnapshot);

    wrappedObserveScoreUpdate(change, {
      params: {
        userId: "oogatta"
      }
    });

    expect(send.args[0][0]).to.be.equal("test");
  });

  it("should not send a push notification on poor score.", () => {
    const wrappedObserveScoreUpdate = test.wrap(observeScoreUpdate);

    const beforeDocumentSnapshot = test.database
      .makeDataSnapshot({ score: 10 }, "user-score/oogatta");

    const afterDocumentSnapshot = test.database
      .makeDataSnapshot({ score: 9 }, "user-score/oogatta");

    const change = test.makeChange(beforeDocumentSnapshot, afterDocumentSnapshot);

    wrappedObserveScoreUpdate(change, {
      params: {
        userId: "oogatta"
      }
    });

    expect(send.called).to.be.false;
  });
});
