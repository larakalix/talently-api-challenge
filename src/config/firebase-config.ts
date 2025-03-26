import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    // …other firebase config properties
};

class FirebaseInstance {
    private static instance: FirebaseInstance;
    public app: FirebaseApp;
    public auth: Auth;
    public db: Firestore;

    private constructor() {
        this.app = initializeApp(firebaseConfig);
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
