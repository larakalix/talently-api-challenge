import type { User } from "../../models/user";
import { injectable } from "tsyringe";
import { firestore } from "../../config/firebase-config";

@injectable()
export class UserRepository {
    private collection = firestore.collection("users");

    async create(user: User): Promise<User | null> {
        return (await this.collection.doc(user.id).set(user)) satisfies User;
    }

    async getUserById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;

        return doc.data() satisfies User;
    }
}
