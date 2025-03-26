import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userSchema = authSchema.merge(
    z.object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
    })
);

export type User = z.infer<typeof userSchema>;
