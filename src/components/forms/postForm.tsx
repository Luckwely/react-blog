import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type postSchemaType } from "../../schemas/PostSchema";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";

type Props = { onSuccess?: () => void };

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export default function PostForm({ onSuccess }: Props) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", description: "", image_url: undefined },
  });

  const submit: SubmitHandler<postSchemaType> = async ({ title, description, image_url }) => {
    if (!user) {
      setError("root", { message: "You must be logged in to publish a post" });
      return;
    }

    const file = image_url[0];
    // one folder per user: <user id>/<random id>.<ext>
    const path = `${user.id}/${crypto.randomUUID()}.${EXTENSIONS[file.type]}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      setError("root", { message: `Image upload failed: ${uploadError.message}` });
      return;
    }

    const { data } = supabase.storage.from("post-images").getPublicUrl(path);

    // user_id is filled automatically by the database (default auth.uid())
    const { error: insertError } = await supabase
      .from("posts")
      .insert({ title, description, image_url: data.publicUrl });

    if (insertError) {
      // don't leave an orphan image behind
      await supabase.storage.from("post-images").remove([path]);
      setError("root", { message: `Could not save the post: ${insertError.message}` });
      return;
    }

    reset();
    onSuccess?.();
  };

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(submit)}>
      <label className="block text-sm font-semibold text-slate-700">
        Image
        <input {...register("image_url")} type="file" accept="image/jpeg,image/png,image/webp" aria-invalid={!!errors.image_url} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.image_url && <p role="alert" className="text-red-500">{errors.image_url.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Post title
        <input {...register("title")} type="text" placeholder="Enter a title" aria-invalid={!!errors.title} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.title && <p role="alert" className="text-red-500">{errors.title.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Description
        <textarea {...register("description")} placeholder="Write your post..." aria-invalid={!!errors.description} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-y" />
        {errors.description && <p role="alert" className="text-red-500">{errors.description.message}</p>}
      </label>
      {errors.root && <p role="alert" className="text-red-500">{errors.root.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">
        {isSubmitting ? "Publishing..." : "Publish post"}
      </button>
    </form>
  );
}