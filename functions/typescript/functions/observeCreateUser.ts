import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

export default functions
  .region("asia-northeast1")
  .firestore
  .document("users/{userId}")
  .onCreate((documentSnapshot, context) => {
    console.log(context.params.userId);
    console.log(documentSnapshot.data());

    return 1;
  });
