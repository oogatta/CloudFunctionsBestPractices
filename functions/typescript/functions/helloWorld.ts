import * as functions from 'firebase-functions';

export default functions
  .region("asia-northeast1")
  .https
  .onRequest((request, response) => {
    response.send("Hello from Firebase!");
  });
