import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CommentForm from "../components/forms/commentForm";
import LikeButton from "../components/likeButton";
import { fetchPostById } from "../lib/posts";
import { timeAgo } from "../lib/time";
import { useAuth } from "../hooks/useAuth";
import { useComments } from "../hooks/useComments";
import type { Post } from "../types/Post";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        setLoading(true);
        setError(null);

        fetchPostById(id)
            .then((result) => {
                if (!cancelled) setPost(result);
            })
            .catch((e: { message?: string }) => {
                if (!cancelled) setError(e.message ?? "Could not load this post");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading && id) {
        return <p className="mx-auto max-w-7xl p-8 text-slate-500">Loading post...</p>;
    }

    if (error || !post) {
        return (
            <section className="mx-auto max-w-7xl p-8">
                <p role="alert" className="text-slate-600">
                    {error ? `Could not load this post: ${error}` : "This post doesn't exist or was removed."}
                </p>
                <Link to="/" className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-700">
                    ← Back to all posts
                </Link>
            </section>
        );
    }

    return <PostView post={post} />;
}

function PostView({ post }: { post: Post }) {
    const { user } = useAuth();
    const { comments, loading, error, add, remove } = useComments(post.id);
    const [actionError, setActionError] = useState<string | null>(null);

    const handleDelete = async (commentId: string) => {
        if (!window.confirm("Delete this comment?")) return;
        setActionError(null);
        try {
            await remove(commentId);
        } catch {
            setActionError("Could not delete the comment. Please try again.");
        }
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
            <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-2xl sm:p-6 lg:grid-cols-2 lg:gap-8">

                <article className="min-w-0">
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 sm:p-8">
                        <h1 className="break-words text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                            {post.title}
                        </h1>

                        <div className="mt-4 text-sm text-slate-500">
                            {new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: "long" })}
                        </div>

                        <p className="mt-5 whitespace-pre-line break-words text-slate-600 leading-relaxed text-base sm:text-[1.05rem]">
                            {post.description}
                        </p>

                        <div className="mt-6 flex items-start justify-between border-t border-slate-200 pt-4">
                            <LikeButton postId={post.id} initialCount={post.likes_count} />
                            <div className="flex items-center gap-1 pt-2 text-slate-500">
                                <span className="text-lg">💬</span>
                                <span className="text-sm font-medium">{comments.length}</span>
                                <span className="text-sm">{comments.length === 1 ? "comment" : "comments"}</span>
                            </div>
                        </div>
                    </div>
                </article>

                <section className="flex min-w-0 flex-col">

                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <span className="text-indigo-500"></span> COMMENTS
                    </h2>

                    <div className="mt-5 space-y-4 pr-1 lg:max-h-[32rem] lg:overflow-y-auto">
                        {loading && <p className="text-sm text-slate-500">Loading comments...</p>}
                        {error && <p role="alert" className="text-sm text-red-500">Could not load comments: {error}</p>}
                        {!loading && !error && comments.length === 0 && (
                            <p className="text-sm text-slate-500">No comments yet. Be the first to comment.</p>
                        )}
                        {actionError && <p role="alert" className="text-sm text-red-500">{actionError}</p>}

                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                                    {c.author_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm text-slate-800">{c.author_name}</span>
                                        <span className="text-[11px] text-slate-400">{timeAgo(c.created_at)}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-0.5 whitespace-pre-line break-words">{c.content}</p>
                                    {user?.id === c.user_id && (
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(c.id)}
                                            className="mt-1.5 text-xs font-medium text-slate-400 hover:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {user ? (
                        <CommentForm onAdd={add} />
                    ) : (
                        <p className="mt-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
                            Log in to write a comment.
                        </p>
                    )}
                </section>

            </div>
        </section>
    );
}