import { z } from "zod";

const { FIREBASE_KEY: SecretKey, DATABASE_URL: DatabaseUrl } = process.env;

export const envConfigSchema = z.object({
    DatabaseUrl: z.string().nonempty(),
    SecretKey: z.string().nonempty(),
});

export const globalEnv = {
    DatabaseUrl,
    SecretKey,
} as z.infer<typeof envConfigSchema>;
