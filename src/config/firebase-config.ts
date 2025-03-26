import * as admin from "firebase-admin";
import accountKey from "./account-key.json";

admin.initializeApp({
    credential: admin.credential.cert(accountKey as admin.ServiceAccount),
});

export const auth = admin.auth();
export const firestore = admin.firestore();
