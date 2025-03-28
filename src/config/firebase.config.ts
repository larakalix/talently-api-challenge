import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { globalEnv } from "./env.config";

const {
    apiKey,
    authDomain,
    appId,
    storageBucket,
    messagingSenderId,
    projectId,
    measurementId,
} = globalEnv;

class FirebaseInstance {
    private static instance: FirebaseInstance;
    public app: FirebaseApp;
    public auth: Auth;
    public db: Firestore;

    private constructor() {
        this.app = initializeApp({
            apiKey,
            authDomain,
            appId,
            storageBucket,
            messagingSenderId,
            projectId,
            measurementId,
        });
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    public static getInstance(): FirebaseInstance {
        if (!FirebaseInstance.instance) {
            FirebaseInstance.instance = new FirebaseInstance();
        }
        return FirebaseInstance.instance;
    }
}

export default FirebaseInstance;
