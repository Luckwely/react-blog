import { useCallback, useEffect, useState } from "react";
import { addComment, deleteComment, fetchComments } from "../lib/comments";
import type { PostComment } from "../types/Comment";

export function useComments(postId: string) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchComments(postId)
      .then((result) => {
        if (!cancelled) setComments(result);
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? "Could not load comments");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [postId]);

  // both throw on failure so the caller can show a message
  const add = useCallback(
    async (content: string) => {
      const created = await addComment(postId, content);
      setComments((prev) => [created, ...prev]);
    },
    [postId]
  );

  const remove = useCallback(async (id: string) => {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { comments, loading, error, add, remove };
}