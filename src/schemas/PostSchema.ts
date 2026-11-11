import z from "zod";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const title = z.string().trim().min(2, "At least 2 characters").max(255, "Maximum 255 characters");
const description = z.string().trim().min(1, "Description required").max(5000, "Maximum 5000 characters");

// Creating a post: the image is required.
// register() on <input type="file"> gives a FileList, not a File.
export const postSchema = z.object({
    title,
    image_url: z
        .instanceof(FileList, { message: "Image required" })
        .refine((f) => f.length > 0, "Image required")
        .refine((f) => f.length === 0 || ACCEPTED_TYPES.includes(f[0].type), "Only jpeg, png or webp accepted")
        .refine((f) => f.length === 0 || f[0].size <= MAX_SIZE, "Image must be 5 MB or smaller"),
    description,
});

// Editing a post: a new image is optional (leave empty to keep the current one).
export const editPostSchema = z.object({
    title,
    image_url: z
        .instanceof(FileList)
        .optional()
        .refine((f) => !f || f.length === 0 || ACCEPTED_TYPES.includes(f[0].type), "Only jpeg, png or webp accepted")
        .refine((f) => !f || f.length === 0 || f[0].size <= MAX_SIZE, "Image must be 5 MB or smaller"),
    description,
});

export type postSchemaType = z.infer<typeof postSchema>;
export type editPostSchemaType = z.infer<typeof editPostSchema>;