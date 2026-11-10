import z from "zod";

export const userSchema = z.object({
    name: z.string().trim().min(2, "At least 2 characters").max(255, "Maximum 255 characters"),
    email: z.email("Please enter a valid email").max(255, "Maximum 255 characters"),
    password: z.string().min(8, "Minimum 8 characters").max(72, "Maximum 72 characters"),
});

export type userSchemaType = z.infer<typeof userSchema>;