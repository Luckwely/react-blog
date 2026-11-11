import { useState } from "react";
import Modal from "./modal";
import { deletePost } from "../lib/posts";
import type { Post } from "../types/Post";

type Props = {
  post: Post;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeletePostModal({ post, onClose, onDeleted }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    setBusy(true);
    setError(null);
    try {
      await deletePost(post);
      onDeleted();
    } catch (e) {
      const message = (e as { message?: string }).message ?? "Unknown error";
      setError(`Could not delete the post: ${message}`);
      setBusy(false);
    }
  };

  return (
    <Modal title="Delete this post?" setOpen={() => !busy && onClose()}>
      <p className="break-words text-sm text-slate-600">
        “{post.title}” and all of its likes and comments will be permanently deleted. This can't be undone.
      </p>
      {error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={busy}
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}