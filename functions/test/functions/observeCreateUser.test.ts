import "mocha";
import {expect} from "chai";
import sinon = require("sinon");

import * as FunctionsTest from "firebase-functions-test";
const test = FunctionsTest();
test.mockConfig({});

import * as admin from "firebase-admin";

import {CollectionReference, DocumentReference, Firestore} from "../lib/firestore";

import observeCreateUser from "../../typescript/functions/observeCreateUser";

describe("observeCreateUser function", () => {
  after(() => {
    test.cleanup();
  });

  it("should set another test document.", () => {
    const wrappedObserveCreateUser = test.wrap(observeCreateUser);

    const documentSnapshot = test.firestore
      .makeDocumentSnapshot({ name: "Naohiro Oogatta" }, "users/oogatta");

    const firestoreObject = new Firestore();
    sinon.stub(admin, "firestore")
      .get(() => () => firestoreObject);

    const testCollectionObject = new CollectionReference();
    sinon.stub(firestoreObject, "collection")
      .withArgs("test")
      .returns(testCollectionObject);

    const userIdDocObject = new DocumentReference();
    sinon.stub(testCollectionObject, "doc")
      .returns(userIdDocObject);

    const set = sinon.stub(userIdDocObject, "set");

    wrappedObserveCreateUser(documentSnapshot, {
      params: {
        userId: "oogatta"
      }
    });

    expect(set.args[0][0]).to.deep.equal({
      test: true,
      name: "Naohiro Oogatta",
      userId: "oogatta",
    });
  });
});
