import { ApiError } from "types/errors.type";

import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import taskRoutes from "routes/task/task.routes";
import userRoutes from "routes/user/user.route";

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());

// Use the auth and task routes
app.use("/auth", userRoutes);
app.use("/tasks", taskRoutes);

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
