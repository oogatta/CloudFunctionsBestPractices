import "mocha";
import {expect} from "chai";
import sinon = require("sinon");

import * as FunctionsTest from "firebase-functions-test";
const test = FunctionsTest();
test.mockConfig({});

import * as admin from "firebase-admin";

import observeCreateUser from "../../typescript/functions/observeCreateUser";

describe("observeCreateUser function", () => {
  after(() => {
    test.cleanup();
  });

  it("should return 1.", () => {
    const documentSnapshot = test.firestore.makeDocumentSnapshot({ name: "Naohiro Oogatta" }, "users/oogatta");
    const wrappedObserveCreateUser = test.wrap(observeCreateUser);

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
  });
});

class Firestore {
  collection(collectionpath: string): CollectionReference {
    return new CollectionReference();
  }
}

class CollectionReference {
  doc(documentPath: string): DocumentReference {
    return new DocumentReference();
  }
}

class DocumentReference {
  set(documentRef: DocumentReference, data: any, options?: any): any {
    return 1;
  }
}