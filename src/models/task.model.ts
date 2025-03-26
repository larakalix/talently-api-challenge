import { z } from "zod";

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    DONE = "done",
    DELETED = "deleted",
}

export const taskSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});

export const handleTaskSchema = taskSchema.omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export type Task = z.infer<typeof taskSchema>;
