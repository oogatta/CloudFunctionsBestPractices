import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
if (admin.apps.length === 0 ) {
  admin.initializeApp();
}

import pushNotification from "../lib/pushNotification";

export default functions
  .region("asia-northeast1")
  .database
  .ref("user-score/{userId}")
  .onUpdate((change, context) => {
    if (change.after.val().score - change.before.val().score >= 5) {
      return pushNotification.send("test")
    }
    return 1;
  });
