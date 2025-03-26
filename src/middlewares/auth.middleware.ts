import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./../types/errors.type";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError("No token provided", 401);

        const token = authHeader.split("Bearer ")[1];
        if (!token) throw new ApiError("Invalid token format", 401);

        next();
    } catch (error) {
        next(new ApiError("Unauthorized", 401));
    }
};
