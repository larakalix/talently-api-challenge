import type { ApiResponse } from "types/api.type";
import type { Task } from "models/task";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "services/task/task-service";
import { injectable, inject } from "tsyringe";

@injectable()
export class TaskController {
    constructor(@inject(TaskService) private taskService: TaskService) {}

    async getTasksByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const tasks = await this.taskService.getTasksByUserId(userId);

            return res.status(200).json({
                data: tasks,
                message: "Tasks retrieved successfully",
                status: "success",
            } as ApiResponse<Task[]>);
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Error retrieving tasks",
                status: "error",
            } as ApiResponse<null>);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await this.taskService.createTask(req.body);
            return res.status(201).json({
                data: task,
                message: "Task created successfully",
                status: "success",
            } as ApiResponse<Task>);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await this.taskService.updateTask({
                ...req.body,
                id: req.params.id,
            });
            return res.status(201).json({
                data: task,
                message: "Task updated successfully",
                status: "success",
            } as ApiResponse<Task>);
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            await this.taskService.deleteTask(req.params.id);
            return res.status(200).json({
                data: null,
                message: "Task deleted successfully",
                status: "success",
            } as ApiResponse<null>);
        } catch (error) {
            next(error);
        }
    }
}
