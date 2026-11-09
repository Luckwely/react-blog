export default function RegisterForm() {
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <label className="block text-sm font-semibold text-slate-700">
        Name
        <input type="text" name="name" required placeholder="Your name" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Email
        <input type="email" name="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input type="password" name="password" required minLength={6} placeholder="At least 6 characters" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
      </label>
      <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700">Create account</button>
    </form>
  );
}
