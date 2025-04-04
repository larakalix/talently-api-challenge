import type { ApiResponse } from "./../../types/api.type";
import type { Task } from "./../../models/task.model";
import type { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import { TaskService } from "./../../services/task/task.service";
import { userMiddleware } from "./../../middlewares/user.middleware";

@injectable()
export class TaskController {
    constructor(@inject(TaskService) private taskService: TaskService) {}

    async getTasksByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await userMiddleware(req);
            const tasks = await this.taskService.getTasksByUserId(userId);

            return res.status(200).json({
                data: tasks,
                message: "Tasks retrieved successfully",
                status: "success",
            } as ApiResponse<Task[]>);
        } catch (error) {
            console.log("TaskController -> getTasksByUserId -> error", error);
            return res.status(500).json({
                data: null,
                message: "Error retrieving tasks",
                status: "error",
            } as ApiResponse<null>);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await userMiddleware(req);
            const task = await this.taskService.createTask({
                ...req.body,
                userId,
            });

            return res.status(201).json({
                data: task,
                message: "Task created successfully",
                status: "success",
            } as ApiResponse<Task>);
        } catch (error) {
            console.log("TaskController -> createTask -> error", error);
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
            console.log("TaskController -> updateTask -> error", error);
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
            console.log("TaskController -> deleteTask -> error", error);
            next(error);
        }
    }
}
