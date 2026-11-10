import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "../../schemas/LoginSchema";
import { supabase } from "../../lib/supabase";

type Props = { onSuccess?: () => void };

export default function LoginForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submit: SubmitHandler<loginSchemaType> = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.code === "invalid_credentials") {
        // same message for wrong email or wrong password (don't reveal which)
        setError("root", { message: "Invalid email or password" });
      } else if (error.code === "email_not_confirmed") {
        setError("root", { message: "Please confirm your email first, then log in" });
      } else {
        setError("root", { message: error.message });
      }
      return;
    }

    onSuccess?.();
  };

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(submit)}>
      <label className="block text-sm font-semibold text-slate-700">
        Email
        <input {...register("email")} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.email && <p role="alert" className="text-red-500">{errors.email.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input {...register("password")} type="password" autoComplete="current-password" placeholder="••••••••" aria-invalid={!!errors.password} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.password && <p role="alert" className="text-red-500">{errors.password.message}</p>}
      </label>
      {errors.root && <p role="alert" className="text-red-500">{errors.root.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}