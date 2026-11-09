import z from "zod";

export const postSchema = z.object({
    title: z.string().nonempty('Field required').min(2, 'at least 2 character').max(255, "max length 255"),
    image_url: z.file().mime(['image/jpeg', 'image/png', 'image/webp'], "Only jpeg, png, web are accepted"),
    description: z.string().nonempty('description required'),
    isLike: z.boolean(),
    comment: z.string()
});

export type postSchemaType = z.infer<typeof postSchema>