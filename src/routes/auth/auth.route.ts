import { AuthController } from "./../../controllers/auth/auth.controller";
import { Router } from "express";
import { container } from "tsyringe";

const authRoutes = Router();
const authController = container.resolve(AuthController);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         data: Created user
 *         message: User created successfully
 */
authRoutes.post("/register", (req, res) => {
    authController.signup(req, res);
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         data: User login successful
 *         message: User logged in successfully
 */
authRoutes.post("/login", (req, res) => {
    authController.signin(req, res);
});

export default authRoutes;
