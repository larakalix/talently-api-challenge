import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./../types/errors.type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { globalEnv } from "./../config/env.config";

declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: string;
                email?: string;
                [key: string]: any;
            };
        }
    }
}

const getFirebasePublicKeys = async (): Promise<Record<string, string>> => {
    const response = await fetch(
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
    );
    if (!response.ok) {
        throw new Error("Failed to fetch public keys");
    }
    const data = await response.json();
    return data;
};

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

        const decodedHeader = jwt.decode(token, { complete: true });
        if (
            !decodedHeader ||
            typeof decodedHeader === "string" ||
            !decodedHeader.header.kid
        ) {
            throw new ApiError("Invalid token header", 401);
        }
        const kid = decodedHeader.header.kid;

        const publicKeys = await getFirebasePublicKeys();
        const publicKey = publicKeys[kid];
        if (!publicKey) {
            throw new ApiError(
                "Unable to find public key for the provided token",
                401
            );
        }

        const firebaseProjectId = globalEnv.projectId;
        if (!firebaseProjectId) {
            throw new ApiError("Firebase project ID not configured", 500);
        }

        const verifyOptions = {
            algorithms: ["RS256"] as jwt.Algorithm[],
            issuer: `https://securetoken.google.com/${firebaseProjectId}`,
            audience: firebaseProjectId,
        };

        jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err);
                return next(new ApiError("Unauthorized", 401));
            }

            const user = {
                uid: (decoded as JwtPayload).user_id,
                email: (decoded as JwtPayload).email,
            };

            req.user = user;
            next();
        });
    } catch (error) {
        next(new ApiError("Unauthorized", 401));
    }
};
