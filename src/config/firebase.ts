import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();
export const firestore = admin.firestore();
