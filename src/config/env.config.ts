import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();


const {
    FIREBASE_API_KEY: apiKey,
    FIREBASE_AUTH_DOMAIN: authDomain,
    FIREBASE_APP_ID: appId,
    FIREBASE_STORAGE_BUCKET: storageBucket,
    FIREBASE_MESSAGE_SENDER_ID: messagingSenderId,
    FIREBASE_PROJECT_ID: projectId,
    FIREBASE_MEASUREMENT_ID: measurementId,
} = process.env;

export const envConfigSchema = z.object({
    appId: z.string().nonempty(),
    apiKey: z.string().nonempty(),
    authDomain: z.string().nonempty(),
    projectId: z.string().nonempty(),
    storageBucket: z.string().nonempty(),
    messagingSenderId: z.string().nonempty(),
    measurementId: z.string().nonempty(),
});

export const globalEnv = {
    apiKey,
    authDomain,
    appId,
    storageBucket,
    messagingSenderId,
    projectId,
    measurementId,
} as z.infer<typeof envConfigSchema>;
