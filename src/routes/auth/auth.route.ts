import { AuthController } from "@/controllers/auth/auth.controller";
import { Router } from "express";
import { container } from "tsyringe";

const authRoutes = Router();
const authController = container.resolve(AuthController);

authRoutes
    .post("/register", (req, res) => {
        authController.signup(req, res);
    })
    .post("/login", (req, res) => {
        authController.signin(req, res);
    });

export default authRoutes;
