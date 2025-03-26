import type { ApiResponse } from "types/api.type";
import type { User } from "models/user.model";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "services/user/user.service";
import { injectable, inject } from "tsyringe";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.register(
                req.body.email,
                req.body.password
            );

            return res.status(201).json({
                data: user,
                message: "User created successfully",
                status: "success",
            } as ApiResponse<User>);
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Error creating user",
                status: "error",
            } as ApiResponse<null>);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.login(
                req.body.email,
                req.body.password
            );

            return res.status(200).json({
                data: user,
                message: "User logged in successfully",
                status: "success",
            } as ApiResponse<User>);
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Error logging in",
                status: "error",
            } as ApiResponse<null>);
        }
    }
}
