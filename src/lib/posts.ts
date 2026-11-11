import { supabase } from "./supabase";
import type { Post } from "../types/Post";

const BUCKET = "post-images";
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// likes(count) and comments(count) ask Supabase for the totals in the same request
const COLUMNS = "id, user_id, title, description, image_url, created_at, likes(count), comments(count)";

type PostRow = Omit<Post, "likes_count" | "comments_count"> & {
  likes: { count: number }[];
  comments: { count: number }[];
};

function toPost({ likes, comments, ...rest }: PostRow): Post {
  return {
    ...rest,
    likes_count: likes?.[0]?.count ?? 0,
    comments_count: comments?.[0]?.count ?? 0,
  };
}

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

  return { posts: ((data ?? []) as unknown as PostRow[]).map(toPost), total: count ?? 0 };
}

export async function fetchPostById(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? toPost(data as unknown as PostRow) : null; // null = no post with that id
}

/* ---------- images ---------- */

export async function uploadPostImage(userId: string, file: File) {
  // one folder per user: <user id>/<random id>.<ext>
  const path = `${userId}/${crypto.randomUUID()}.${EXTENSIONS[file.type]}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

// "https://xyz.supabase.co/storage/v1/object/public/post-images/<user>/<file>" -> "<user>/<file>"
export function storagePathFromUrl(url: string) {
  const marker = `/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

// Best effort: a leftover file is harmless, so a failure here must never break the user's action.
export async function removeImageByUrl(url: string) {
  const path = storagePathFromUrl(url);
  if (!path) return;
  try {
    await supabase.storage.from(BUCKET).remove([path]);
  } catch {
    /* ignore */
  }
}

/* ---------- edit / delete ---------- */

type PostChanges = { title: string; description: string; image_url?: string };

export async function updatePost(id: string, changes: PostChanges) {
  // .single() fails when no row was updated (for example, not your post)
  const { error } = await supabase.from("posts").update(changes).eq("id", id).select("id").single();
  if (error) throw error;
}

export async function deletePost(post: Post) {
  const { data, error } = await supabase.from("posts").delete().eq("id", post.id).select("id");
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("You are not allowed to delete this post");

  // the row is gone (its likes and comments are deleted with it); now remove the image
  await removeImageByUrl(post.image_url);
}