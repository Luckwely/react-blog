import { useAuth } from "../hooks/useAuth";
import { useLike } from "../hooks/useLike";

type Props = { postId: string; initialCount: number };

export default function LikeButton({ postId, initialCount }: Props) {
  const { user } = useAuth();
  const { liked, count, busy, error, toggle } = useLike(postId, initialCount);

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        disabled={!user || busy}
        aria-pressed={liked}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors disabled:cursor-not-allowed ${
          liked ? "bg-rose-50 text-rose-600" : "text-slate-600 enabled:hover:bg-rose-50 enabled:hover:text-rose-600"
        }`}
      >
        <span className="inline-block text-xl">{liked ? "♥" : "♡"}</span>
        <span className="font-medium">{count}</span>
        <span className="text-sm text-slate-400">{count === 1 ? "like" : "likes"}</span>
      </button>
      {!user && <p className="mt-1 px-4 text-xs text-slate-400">Log in to like this post</p>}
      {error && <p role="alert" className="mt-1 px-4 text-xs text-red-500">{error}</p>}
    </div>
  );
}