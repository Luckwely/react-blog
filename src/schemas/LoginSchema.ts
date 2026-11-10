import z from "zod";
import { userSchema } from "./UserSchema";

export const loginSchema = z.object({
    email: userSchema.shape.email,
    password: z.string().min(1, "Password required"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;