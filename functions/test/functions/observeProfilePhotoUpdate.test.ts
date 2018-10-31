import "mocha";
import {expect} from "chai";
import sinon = require("sinon");

import * as FunctionsTest from "firebase-functions-test";
const test = FunctionsTest();
test.mockConfig({});

import * as admin from "firebase-admin";

import {CollectionReference, DocumentReference, Firestore} from "../lib/firestore";

import observeProfilePhotoUpdate from "../../typescript/functions/observeProfilePhotoUpdate";

describe("observeProfilePhotoUpdate function", () => {
  after(() => {
    test.cleanup();
  });

  it("should set another test document.", () => {
    const wrappedObserveProfilePhotoUpdate = test.wrap(observeProfilePhotoUpdate);

    const firestoreObject = new Firestore();
    sinon.stub(admin, "firestore")
      .get(() => () => firestoreObject);

    const testCollectionObject = new CollectionReference();
    sinon.stub(firestoreObject, "collection")
      .withArgs("users")
      .returns(testCollectionObject);

    const userIdDocObject = new DocumentReference();
    const doc = sinon.stub(testCollectionObject, "doc")
      .returns(userIdDocObject);

    const update = sinon.stub(userIdDocObject, "update");

    const objectMetadata = test.storage.makeObjectMetadata({
      name: "user-profile-photos/oogatta",
      contentType: "image/jpeg",
    });

    wrappedObserveProfilePhotoUpdate(objectMetadata);

    expect(doc.args[0][0]).to.be.equal("oogatta");
    expect(update.args[0][0]).to.deep.equal({
      hasProfilePhoto: true,
    });
  });
});
