import { useEffect, useState } from "react";
import { addLike, hasLiked, removeLike } from "../lib/likes";
import { useAuth } from "./useAuth";

export function useLike(postId: string, initialCount: number) {
  const { user } = useAuth();
  const userId = user?.id;

  const [likedByMe, setLikedByMe] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // did the logged-in user already like this post?
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    hasLiked(postId, userId)
      .then((value) => {
        if (!cancelled) setLikedByMe(value);
      })
      .catch(() => {
        /* leave it as "not liked" */
      });
    return () => {
      cancelled = true;
    };
  }, [postId, userId]);

  const liked = userId ? likedByMe : false;

  const toggle = async () => {
    if (!userId || busy) return;
    const next = !liked;

    // update the screen immediately, undo if the server refuses
    setBusy(true);
    setError(null);
    setLikedByMe(next);
    setCount((c) => c + (next ? 1 : -1));

    try {
      if (next) await addLike(postId);
      else await removeLike(postId, userId);
    } catch {
      setLikedByMe(!next);
      setCount((c) => c + (next ? -1 : 1));
      setError("Could not update your like. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return { liked, count, busy, error, toggle };
}