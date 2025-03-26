import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TaskController } from "controllers/task/task-controller";

const taskRoutes = Router();
const taskController = container.resolve(TaskController);

taskRoutes
    .get("/", (req: Request, res: Response, next: NextFunction) => {
        taskController.getTasksByUserId(req, res, next);
    })
    .post("/", (req: Request, res: Response, next: NextFunction) => {
        taskController.createTask(req, res, next);
    })
    .put("/:id", (req: Request, res: Response, next: NextFunction) => {
        taskController.updateTask(req, res, next);
    })
    .delete("/:id", (req: Request, res: Response, next: NextFunction) => {
        taskController.deleteTask(req, res, next);
    });

export default taskRoutes;
