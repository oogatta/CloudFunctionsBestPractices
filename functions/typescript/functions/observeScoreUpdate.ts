import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();

import pushNotification from "../lib/pushNotification";

export default functions
  .region("asia-northeast1")
  .database
  .ref("user-score/{userId}")
  .onUpdate((change, context) => {
    if (change.after.val().score - change.before.val().score >= 5) {
      pushNotification.send("test")
    }
  });
