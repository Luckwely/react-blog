export default function PostForm() {
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <label className="block text-sm font-semibold text-slate-700">
        Post title
        <input type="text" name="title" required placeholder="Enter a title" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Content
        <textarea name="content" required rows={5} placeholder="Write your post..." className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700">Publish post</button>
    </form>
  );
}
