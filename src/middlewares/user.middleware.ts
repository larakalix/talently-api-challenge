import type { Request } from "express";

export const userMiddleware = async (req: Request): Promise<string> => {
    try {
        const user = req.user;
        if (!user) throw new Error("User not found in request object");

        return user.uid;
    } catch (error) {
        throw new Error(error.message);
    }
};
