import type { ApiResponse } from "./../../types/api.type";
import { authSchema, type AuthUser } from "./../../models/user.model";
import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { AuthService } from "./../../services/auth/auth.service";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    async signup(req: Request, res: Response): Promise<Response> {
        try {
            const data = authSchema.parse(req.body);
            const user = await this.authService.signup(
                data.email,
                data.password
            );

            return res.status(201).json({
                data: user,
                message: "User created successfully",
                status: "success",
            } as ApiResponse<AuthUser>);
        } catch (error: any) {
            console.log("AuthController -> signup -> error", error);
            return res
                .status(400)
                .json({ success: false, message: error.message });
        }
    }

    async signin(req: Request, res: Response): Promise<Response> {
        try {
            const data = authSchema.parse(req.body);
            const session = await this.authService.signin(
                data.email,
                data.password
            );

            return res.status(200).json({
                data: session,
                message: "User signed in successfully",
                status: "success",
            } as ApiResponse<AuthUser>);
        } catch (error: any) {
            console.log("AuthController -> signin -> error", error);
            return res
                .status(400)
                .json({ success: false, message: error.message });
        }
    }
}
