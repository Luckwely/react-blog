import { Fragment } from "react";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  // always show first, last and the pages around the current one
  const visible = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const base =
    "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} className={`${base} min-w-20 px-4 py-2.5`}>
        Prev
      </button>
      {visible.map((p, i) => (
        <Fragment key={p}>
          {i > 0 && p - visible[i - 1] > 1 && <span className="px-1 text-slate-400">…</span>}
          <button
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={
              p === page
                ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200"
                : `${base} h-10 w-10`
            }
          >
            {p}
          </button>
        </Fragment>
      ))}
      <button type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)} className={`${base} min-w-20 px-4 py-2.5`}>
        Next
      </button>
    </nav>
  );
}