import { Router } from "express";
import { container } from "tsyringe";
import { TaskController } from "@/controllers/task/task.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const taskRoutes = Router();
const taskController = container.resolve(TaskController);

taskRoutes
    .get("/", authMiddleware, (req, res, next) => {
        taskController.getTasksByUserId(req, res, next);
    })
    .post("/", authMiddleware, (req, res, next) => {
        taskController.createTask(req, res, next);
    })
    .put("/:id", authMiddleware, (req, res, next) => {
        taskController.updateTask(req, res, next);
    })
    .delete("/:id", authMiddleware, (req, res, next) => {
        taskController.deleteTask(req, res, next);
    });

export default taskRoutes;
