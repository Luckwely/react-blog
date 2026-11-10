import z from "zod";

export const commentSchema = z.object({
    comment: z.string().trim().min(1, "Comment can't be empty").max(1000, "Maximum 1000 characters"),
});

export type commentSchemaType = z.infer<typeof commentSchema>;