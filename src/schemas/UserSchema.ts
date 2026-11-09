import z from "zod";

export const userSchema = z.object({
    name: z.string().nonempty("Field required").min(2, "At least 2 character").max(255, "Maximum 255 character"),
    email: z.email("please put a valid email"),
    password: z.minLength(8, "minimum 8"),
})

export type userSchemaType = z.infer<typeof userSchema>