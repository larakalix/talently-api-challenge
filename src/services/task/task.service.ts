import { ApiError } from "./../../types/errors.type";
import { handleTaskSchema, type Task } from "./../../models/task.model";
import { injectable, inject } from "tsyringe";
import { TaskRepository } from "./../../repositories/task/task.repository";

@injectable()
export class TaskService {
    constructor(
        @inject(TaskRepository) private taskRepository: TaskRepository
    ) {}

    async getTasksByUserId(userId: string): Promise<Task[]> {
        const tasks = await this.taskRepository.getTasksByUserId(userId);
        console.log("TaskService -> getTasksByUserId -> tasks", tasks);

        return tasks;
    }

    async createTask(task: Task): Promise<Task> {
        const parsed = handleTaskSchema.safeParse(task);
        if (!parsed.success) throw new ApiError("Validation error", 400);

        const now = new Date();

        return await this.taskRepository.create({
            ...task,
            createdAt: now,
            updatedAt: now,
        });
    }

    async updateTask(task: Task): Promise<Task> {
        const parsed = handleTaskSchema.safeParse(task);
        if (!parsed.success) throw new ApiError("Validation error", 400);

        return await this.taskRepository.update(`${task.id}`, task);
    }

    async deleteTask(id: string): Promise<void> {
        return await this.taskRepository.delete(id);
    }
}
