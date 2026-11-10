import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { userSchema, type userSchemaType } from "../../schemas/UserSchema";
import { supabase } from "../../lib/supabase";

type Props = { onSuccess?: () => void };

export default function RegisterForm({ onSuccess }: Props) {
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const submit: SubmitHandler<userSchemaType> = async ({ name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }, // saved in user.user_metadata.name
    });

    if (error) {
      if (error.code === "user_already_exists" || error.code === "email_exists") {
        setError("email", { message: "This email is already registered" });
      } else if (error.code === "weak_password") {
        setError("password", { message: error.message });
      } else {
        setError("root", { message: error.message });
      }
      return;
    }

    // With email confirmation ON, Supabase hides duplicate emails by returning
    // a user with no identities instead of an error.
    if (data.user && data.user.identities?.length === 0) {
      setError("email", { message: "This email is already registered" });
      return;
    }

    if (data.session) {
      onSuccess?.(); // confirmation OFF: already signed in
    } else {
      setNeedsConfirmation(true); // confirmation ON: wait for the email link
    }
  };

  if (needsConfirmation) {
    return (
      <p role="status" className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800">
        Account created. Check your email and click the confirmation link, then log in.
      </p>
    );
  }

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(submit)}>
      <label className="block text-sm font-semibold text-slate-700">
        Name
        <input {...register("name")} type="text" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.name && <p role="alert" className="text-red-500">{errors.name.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Email
        <input {...register("email")} type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.email && <p role="alert" className="text-red-500">{errors.email.message}</p>}
      </label>
      <label className="block text-sm font-semibold text-slate-700">
        Password
        <input {...register("password")} type="password" autoComplete="new-password" placeholder="At least 8 characters" aria-invalid={!!errors.password} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        {errors.password && <p role="alert" className="text-red-500">{errors.password.message}</p>}
      </label>
      {errors.root && <p role="alert" className="text-red-500">{errors.root.message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}