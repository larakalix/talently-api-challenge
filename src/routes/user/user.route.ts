import { AuthController } from "controllers/user/auth.controller";
import { Router, Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

const authRoutes = Router();
const authController = container.resolve(AuthController);

authRoutes
    .post("/register", (req: Request, res: Response, next: NextFunction) => {
        authController.register(req, res, next);
    })
    .post("/login", (req: Request, res: Response, next: NextFunction) => {
        authController.login(req, res, next);
    });

export default authRoutes;
