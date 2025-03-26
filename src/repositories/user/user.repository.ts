import type { User } from "../../models/user";
import { injectable } from "tsyringe";
import { firestore } from "../../config/firebase-config";
import uuid from "uuid";

@injectable()
export class UserRepository {
    private collection = firestore.collection("users");

    private doc(userId?: string) {
        if (!userId) return this.collection.doc();
        return this.collection.doc(userId);
    }

    async create(user: User): Promise<User | null> {
        const ref = this.doc();
        const data = { ...user, id: ref.id };

        return (await this.collection.doc(user.id).set(user)) satisfies User;
    }

    async getUserById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;

        return doc.data() satisfies User;
    }
}
