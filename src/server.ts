import dotenv from "dotenv";
dotenv.config();

import type { ApiError } from "./types/errors.type";
import type { Application, Request, Response, NextFunction } from "express";
import express from "express";
import "reflect-metadata";
import authRoutes from "./routes/auth/auth.route";
import taskRoutes from "./routes/task/task.route";

const PORT = process.env.PORT || 8000;
const app: Application = express();
app.use(express.json());

// Use the router to add prefix for all routes
const router = express.Router();
app.use("/api", router);

// Use the auth and task routes
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/hello", (req, res) => {
    res.send("Hello World");
});

// Global error handler middleware
router.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
