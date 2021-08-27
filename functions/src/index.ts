import * as functions from "firebase-functions";
import admin = require("firebase-admin");

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getPosts = functions.https.onRequest((req, res) => {
  let posts: any[];
  admin
    .firestore()
    .collection("posts")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch((error) => console.log(error));
});

export const getAllPosts = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts : any[] = [];
      data.forEach((doc) => {
        posts.push({
          screamId: doc.id,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});
