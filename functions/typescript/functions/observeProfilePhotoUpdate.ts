import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

export default functions
  .region("asia-northeast1")
  .storage
  .object()
  .onFinalize((object, context) => {
    if (/^user-profile-photos\//.test(object.name)) {
      const match = /^user-profile-photos\/([a-zA-Z0-9]+)/.exec(object.name);
      if(match) {
        const userId = match[1];
        return admin.firestore()
          .collection("users")
          .doc(userId)
          .update({
            hasProfilePhoto: true,
          });
      }
    }

    return 1;
  });
