import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { commentSchema, type commentSchemaType } from "../../schemas/CommentSchema";

export default function CommentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<commentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: "" },
  });

  const submit: SubmitHandler<commentSchemaType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form noValidate className="mt-4 flex items-start gap-3 border-t border-slate-200 pt-4" onSubmit={handleSubmit(submit)}>
      <img src="https://i.pravatar.cc/40?img=7" alt="your avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <textarea
          {...register("comment")}
          placeholder="Write a comment..."
          aria-invalid={!!errors.comment}
          className="w-full min-h-24 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-y bg-slate-50 placeholder:text-slate-400"
        />
        {errors.comment && <p role="alert" className="text-sm text-red-500">{errors.comment.message}</p>}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium rounded-full shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}