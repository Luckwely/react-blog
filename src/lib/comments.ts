import { supabase } from "./supabase";
import type { PostComment } from "../types/Comment";

const COLUMNS = "id, post_id, user_id, content, created_at, profiles(name)";

type CommentRow = Omit<PostComment, "author_name"> & {
  profiles: { name: string } | null;
};

function toComment({ profiles, ...rest }: CommentRow): PostComment {
  return { ...rest, author_name: profiles?.name || "Anonymous" };
}

export async function fetchComments(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(COLUMNS)
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;
  return ((data ?? []) as unknown as CommentRow[]).map(toComment);
}

export async function addComment(postId: string, content: string) {
  // user_id is filled by the database (default auth.uid())
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, content })
    .select(COLUMNS)
    .single();

  if (error) throw error;
  return toComment(data as unknown as CommentRow);
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) throw error;
}