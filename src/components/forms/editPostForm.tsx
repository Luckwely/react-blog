import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPostSchema, type editPostSchemaType } from "../../schemas/PostSchema";
import { removeImageByUrl, updatePost, uploadPostImage } from "../../lib/posts";
import { useAuth } from "../../hooks/useAuth";
import type { Post } from "../../types/Post";

type Props = { post: Post; onSuccess?: () => void };

const INPUT =
  "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function EditPostForm({ post, onSuccess }: Props) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<editPostSchemaType>({
    resolver: zodResolver(editPostSchema),
    defaultValues: { title: post.title, description: post.description, image_url: undefined },
  });

  const submit: SubmitHandler<editPostSchemaType> = async ({ title, description, image_url }) => {
    if (!user) {
      setError("root", { message: "You must be logged in to edit a post" });
      return;
    }

    const file = image_url?.[0];
    let newImageUrl: string | null = null;

    try {
      if (file) newImageUrl = (await uploadPostImage(user.id, file)).url;
      await updatePost(post.id, { title, description, ...(newImageUrl ? { image_url: newImageUrl } : {}) });
    } catch (e) {
      // the save failed: don't leave the freshly uploaded image behind
      if (newImageUrl) await removeImageByUrl(newImageUrl);
      const message = (e as { message?: string }).message ?? "Unknown error";
      setError("root", { message: `Could not save your changes: ${message}` });
      return;
    }

    // saved: the old image is not used anymore
    if (newImageUrl) await removeImageByUrl(post.image_url);
    onSuccess?.();
  };

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(submit)}>
      <div>
        <p className="text-sm font-semibold text-slate-700">Current image</p>
        <img src={post.image_url} alt={post.title} className="mt-2 h-32 w-full rounded-xl object-cover" />
      </div>
      <label className="block text-sm font-semibold text-slate-700">
        Replace image (optional)
        <input {...register("image_url")} type="file" accept="image/jpeg,image/png,image/webp" aria-invalid={!!errors.image_url} className={INPUT} />
        {errors.image_url && <p role="alert" className="text-red-500">{errors.image_url.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Post title
        <input {...register("title")} type="text" aria-invalid={!!errors.title} className={INPUT} />
        {errors.title && <p role="alert" className="text-red-500">{errors.title.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Description
        <textarea {...register("description")} rows={5} aria-invalid={!!errors.description} className={`${INPUT} resize-y`} />
        {errors.description && <p role="alert" className="text-red-500">{errors.description.message}</p>}
      </label>
      {errors.root && <p role="alert" className="text-red-500">{errors.root.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}