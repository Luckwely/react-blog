import { useForm, type SubmitHandler } from "react-hook-form";
import { postSchema, type postSchemaType } from "../../schemas/PostSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    } = useForm<postSchemaType>({
      resolver: zodResolver(postSchema),
      defaultValues: {
        title: '',
        description: '',
        image_url: undefined,
        isLike: false,
        comment: ''
      }
    });


  const submit: SubmitHandler<postSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <label className="block text-sm font-semibold text-slate-700">
        Image
        <input {...register("image_url")} type="file" name="image_url"   className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.image_url && <p role="alert" className="text-red-500">{errors.image_url.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Post title
        <input {...register("title")} type="text" name="title"  placeholder="Enter a title" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.title && <p role="alert" className="text-red-500">{errors.title.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Description
        <textarea {...register("description")} name="description"  placeholder="Write your post..." className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.description && <p role="alert" className="text-red-500">{errors.description.message}</p>}
      </label>
      <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700">Publish post</button>
    </form>
  );
}
