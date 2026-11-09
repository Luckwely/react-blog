import { useState } from "react";
import { NavLink } from "react-router";
import Modal from "./modal";
import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";

export default function Nav() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 py-4 min-[381px]:px-5 md:flex-nowrap md:gap-6 md:px-8">
        <div>
          <NavLink to={"/"}>
            <h1 className="whitespace-nowrap text-xl font-extrabold tracking-[-0.055em] text-indigo-700 sm:text-2xl">MyBlog</h1>
          </NavLink>
        </div>
        <div className="order-3 flex w-full items-center gap-1 border-t border-slate-100 pt-2 md:order-none md:w-auto md:border-0 md:pt-0">
          <NavLink className={({ isActive }) => `flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition md:flex-none ${isActive ? "text-indigo-700" : "text-slate-500 hover:text-indigo-700"}`} to={"/"}>Home</NavLink>
          <NavLink className={({ isActive }) => `flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition md:flex-none ${isActive ? "text-indigo-700" : "text-slate-500 hover:text-indigo-700"}`} to={"mypost"}>My Post</NavLink>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
          <button type="button" onClick={() => setActiveModal("register")} className="whitespace-nowrap rounded-xl px-2 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:py-3 sm:text-sm">Sign Up</button>
          <button type="button" onClick={() => setActiveModal("login")} className="whitespace-nowrap rounded-xl bg-indigo-600 px-2 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 sm:px-4 sm:py-3 sm:text-sm">Log in</button>
        </div>
      </div>

      {activeModal === "login" && (
        <Modal title="Log in" setOpen={() => setActiveModal(null)}>
          <LoginForm />
        </Modal>
      )}

      {activeModal === "register" && (
        <Modal title="Create an account" setOpen={() => setActiveModal(null)}>
          <RegisterForm />
        </Modal>
      )}
    </nav>
  );
}
