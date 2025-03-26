import type { AuthUser } from "@/models/user.model";
import { injectable } from "tsyringe";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import FirebaseInstance from "./../../config/firebase.config";

@injectable()
export class AuthService {
    private auth = FirebaseInstance.getInstance().auth;

    async signup(email: string, password: string): Promise<AuthUser> {
        const { user } = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        );

        return {
            uid: user.uid,
            email: user.email,
            name: user?.displayName || "",
        };
    }

    async signin(email: string, password: string): Promise<AuthUser> {
        const { user } = await signInWithEmailAndPassword(
            this.auth,
            email,
            password
        );

        const token = await user.getIdToken();

        return {
            uid: user.uid,
            email: user.email,
            name: user?.displayName || "",
            token,
        };
    }
}
