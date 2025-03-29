import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import type { ApiError } from "./types/errors.type";
import type { Application, Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./../swagger";
import authRoutes from "./routes/auth/auth.route";
import taskRoutes from "./routes/task/task.route";

const app: Application = express();
app.use(express.json());
app.use("/docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
    cors({
        origin: "*",
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
);

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

export default app;
