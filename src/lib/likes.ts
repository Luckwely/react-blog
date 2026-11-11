import { supabase } from "./supabase";

export async function hasLiked(postId: string, userId: string) {
  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data !== null;
}

export async function addLike(postId: string) {
  // user_id is filled by the database (default auth.uid())
  const { error } = await supabase.from("likes").insert({ post_id: postId });
  // 23505 = already liked (primary key), which is fine
  if (error && error.code !== "23505") throw error;
}

export async function removeLike(postId: string, userId: string) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) throw error;
}