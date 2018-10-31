import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

export default functions
  .region("asia-northeast1")
  .firestore
  .document("users/{userId}")
  .onCreate((documentSnapshot, context) => {
    return admin.firestore()
      .collection("test")
      .doc(context.params.userId)
      .set({
        test: true,
        name: documentSnapshot.data().name,
        userId: context.params.userId,
      });
  });
