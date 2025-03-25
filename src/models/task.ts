import type { CommonModel } from "./generic";

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    DONE = "done",
    DELETED = "deleted",
}

export type Task = CommonModel<string> & {
    userId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: Date;
};
