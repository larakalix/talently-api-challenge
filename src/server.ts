import type { ApiError } from "./types/errors.type";
import type { Application, Request, Response, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import authRoutes from "./routes/auth/auth.route";
import taskRoutes from "./routes/task/task.route";
import { globalEnv } from "./config/env.config";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Application = express();
app.use(express.json());

// Use the auth and task routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use("/", (req, res) => {
    res.send("Hello World");
});

// Global error handler middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
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
