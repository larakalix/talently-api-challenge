import { userSchema, type User } from "../../models/user.model";
import { ApiError } from "types/errors.type";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { injectable, inject } from "tsyringe";
import FirebaseInstance from "../../config/firebase.config";

@injectable()
export class AuthService {
    private auth = FirebaseInstance.getInstance().auth;

    async register(email: string, password: string): Promise<any> {
        try {
            const { user } = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );

            return user;
        } catch (error) {
            throw new ApiError("Registration failed", 500);
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const { user } = await signInWithEmailAndPassword(
                this.auth,
                email,
                password
            );

            return user;
        } catch (error) {
            throw new ApiError("Login failed", 500);
        }
    }
}
