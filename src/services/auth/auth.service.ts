import { injectable } from "tsyringe";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import FirebaseInstance from "./../../config/firebase.config";

@injectable()
export class AuthService {
    private auth = FirebaseInstance.getInstance().auth;

    async signup(email: string, password: string) {
        const userCredential = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        );
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
        };
    }

    async signin(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(
            this.auth,
            email,
            password
        );
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
        };
    }
}
