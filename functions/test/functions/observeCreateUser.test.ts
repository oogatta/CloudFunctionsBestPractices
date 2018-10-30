import { expect } from "chai";
import "mocha";

import * as FunctionsTest from "firebase-functions-test";
const test = FunctionsTest();
test.mockConfig({});

import observeCreateUser from "../../typescript/functions/observeCreateUser";

describe("observeCreateUser function", () => {
  after(() => {
    test.cleanup();
  });

  it("should return 1.", () => {
    const documentSnapshot = test.firestore.makeDocumentSnapshot({ name: "Naohiro Oogatta" }, "users/oogatta");
    const wrappedOserveCreateUser = test.wrap(observeCreateUser);

    wrappedOserveCreateUser(documentSnapshot, {
      params: {
        userId: "oogatta"
      }
    });
  });
});
