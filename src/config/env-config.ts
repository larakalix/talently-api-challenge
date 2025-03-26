import { z } from "zod";

const {
    FIREBASE_KEY: SecretKey,
    API_URL: ApiUrl,
 } = process.env;

export const envConfigSchema = z.object({
    ApiUrl: z.string().nonempty(),
    SecretKey: z.string().nonempty(),
});

export const globalEnv = {
    ApiUrl,
    SecretKey,
} as z.infer<typeof envConfigSchema>;
