import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

type Props = {
  children: ReactNode;
  title: string;
  setOpen: (value: boolean) => void;
};

export default function Modal({ children, title, setOpen }: Props) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
