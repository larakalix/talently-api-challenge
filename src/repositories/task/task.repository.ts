import type { Task } from "../../models/task";
import { injectable } from "tsyringe";
import { firestore } from "../../config/firebase-config";

@injectable()
export class TaskRepository {
    private collection = firestore.collection("tasks");

    async create(task: Task): Promise<Task | null> {
        return (await this.collection.doc(task.id).set(task)) satisfies Task;
    }

    async getTaskById(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;

        return doc.data() satisfies Task;
    }

    async getTaskByUserId(userId: string): Promise<Task[]> {
        const snapshot = await this.collection
            .where("userId", "==", userId)
            .get();

        return snapshot.docs.map((doc: any) => doc.data() as Task);
    }

    async updateTask(task: Task): Promise<Task | null> {
        return (await this.collection.doc(task.id).update(task)) satisfies Task;
    }

    async deleteTask(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();

        return await this.updateTask({
            ...doc,
            status: "deleted",
        });
    }
}
