import { Router } from "express";
import { container } from "tsyringe";
import { TaskController } from "./../../controllers/task/task.controller";
import { authMiddleware } from "./../../middlewares/auth.middleware";

const taskRoutes = Router();
const taskController = container.resolve(TaskController);

/**
 * @openapi
 * /api/tasks/:
 *   get:
 *     summary: Get all taks by user id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         data: Array of tasks
 *         message: Tasks retrieved successfully
 */
taskRoutes.get("/", authMiddleware, (req, res, next) => {
    taskController.getTasksByUserId(req, res, next);
});

/**
 * @openapi
 * /api/tasks/:
 *   post:
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         data: Created task
 *         message: Task created successfully
 */
taskRoutes.post("/", authMiddleware, (req, res, next) => {
    taskController.createTask(req, res, next);
});

/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         data: Updated task
 *         message: Task updated successfully
 */
taskRoutes.put("/:id", authMiddleware, (req, res, next) => {
    taskController.updateTask(req, res, next);
});

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         data: Deleted task
 *         message: Task deleted successfully
 */
taskRoutes.delete("/:id", authMiddleware, (req, res, next) => {
    taskController.deleteTask(req, res, next);
});

export default taskRoutes;
