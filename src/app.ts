import express, { Application, Request, Response, NextFunction } from "express";
import "reflect-metadata";
import taskRoutes from "routes/task-routes";
import { ApiError } from "types/errors";

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());

// Use the auth and task routes
app.use("/tasks", taskRoutes);

// Global error handler middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
