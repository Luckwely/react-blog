import { useCallback, useEffect, useState } from "react";
import { fetchPosts } from "../lib/posts";
import { useAuth } from "./useAuth";
import type { Post } from "../types/Post";

type Options = {
  mine?: boolean; // true = only the logged-in user's posts
  pageSize?: number;
};

export function usePosts({ mine = false, pageSize = 8 }: Options = {}) {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const userId = mine ? user?.id : undefined;
  const waitingForAuth = mine && authLoading;
  const noUser = mine && !authLoading && !userId;

  useEffect(() => {
    if (waitingForAuth || noUser) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPosts({ userId, page, pageSize })
      .then((result) => {
        if (cancelled) return;
        setPosts(result.posts);
        setTotal(result.total);
      })
      .catch((e: { message?: string }) => {
        if (!cancelled) setError(e.message ?? "Could not load posts");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [waitingForAuth, noUser, userId, page, pageSize, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return {
    posts: noUser ? [] : posts,
    loading: waitingForAuth || (!noUser && loading),
    error,
    page,
    setPage,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    reload,
  };
}