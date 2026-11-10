import { supabase } from "./supabase";
import type { Post } from "../types/Post";

const COLUMNS = "id, user_id, title, description, image_url, created_at";

type FetchOptions = {
  userId?: string; // only this user's posts (omit for everyone's)
  page: number; // 1-based
  pageSize: number;
};

export async function fetchPosts({ userId, page, pageSize }: FetchOptions) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select(COLUMNS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (userId) query = query.eq("user_id", userId);

  const { data, count, error } = await query;
  if (error) throw error;

  return { posts: (data ?? []) as Post[], total: count ?? 0 };
}

export async function fetchPostById(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Post | null; // null = no post with that id
}