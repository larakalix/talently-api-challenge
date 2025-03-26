import type { Task } from "./../../models/task.model";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import { injectable } from "tsyringe";
import FirebaseInstance from "./../../config/firebase.config";
import { SCHEMAS } from "./../../config/schema.config";

@injectable()
export class TaskRepository {
    private firestore = FirebaseInstance.getInstance().db;
    private tasksCollection = collection(this.firestore, SCHEMAS.tasks.name);

    async getTasksByUserId(userId: string): Promise<Task[]> {
        try {
            const q = query(
                this.tasksCollection,
                // where("userId", "==", userId),
                where("status", "!=", "deleted")
            );
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map((doc: any) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate(),
                    deletedAt: doc.data().deletedAt?.toDate(),
                };
            });
        } catch (error) {
            throw new Error("Error retrieving tasks: " + error);
        }
    }

    async create(task: Omit<Task, "id">): Promise<Task> {
        try {
            const docRef = await addDoc(this.tasksCollection, task);
            return { ...task, id: docRef.id };
        } catch (error) {
            throw new Error("Error creating task: " + error);
        }
    }

    async update(id: string, task: Omit<Task, "id">): Promise<Task> {
        try {
            if (!id) throw new Error("Task id is required");

            const taskDocRef = doc(this.firestore, "tasks", id);
            await updateDoc(taskDocRef, {
                ...task,
                updatedAt: task.updatedAt || Timestamp.fromDate(new Date()),
            });

            return { ...task, id };
        } catch (error) {
            throw new Error("Error updating task: " + error);
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            if (!id) throw new Error("Task id is required");

            const taskDocRef = doc(this.firestore, "tasks", id);
            await updateDoc(taskDocRef, {
                status: "deleted",
                deletedAt: Timestamp.fromDate(new Date()),
            });
        } catch (error) {
            throw new Error("Error deleting task: " + error);
        }
    }
}
