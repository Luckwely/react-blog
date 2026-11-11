import { useState } from "react";
import { Link } from "react-router";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { FaEdit, FaRegCommentDots, FaTrash } from "react-icons/fa";
import Modal from "../components/modal";
import PostForm from "../components/forms/postForm";
import EditPostForm from "../components/forms/editPostForm";
import DeletePostModal from "../components/deletePostModal";
import Pagination from "../components/ui/pagination";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/Post";

export default function MyPost() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState<Post | null>(null);
  const { posts, loading, error, page, setPage, totalPages, reload } = usePosts({ mine: true, pageSize: 5 });

  const handleDeleted = () => {
    setDeleting(null);
    // deleted the last post of a page: go back one page
    if (posts.length === 1 && page > 1) setPage(page - 1);
    else reload();
  };

  return (
    <div className="my-post-page min-h-screen bg-slate-50">
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                All my items
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage, edit and track all of your published posts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              <span className="text-lg leading-none"></span>
              New post
            </button>
          </div>

          {loading && <p className="mt-8 text-slate-500">Loading your posts...</p>}
          {error && <p role="alert" className="mt-8 text-red-500">Could not load posts: {error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="mt-8 text-slate-500">You haven't published any posts yet. Click "New post" to write your first one.</p>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-6 sm:p-7">
                  <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {post.description}
                  </p>

                  <div className="mt-6 flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-5 text-sm text-slate-500">
                      <span>{new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}</span>
                      <span className="inline-flex items-center gap-1"><AiOutlineLike /> {post.likes_count}</span>
                      <span className="inline-flex items-center gap-1"><AiOutlineComment /> {post.comments_count}</span>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                      <Link
                        to={`/postdetails/${post.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        <FaRegCommentDots />
                        View &amp; comment
                      </Link>
                      <button type="button" onClick={() => setEditing(post)} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        <FaEdit className="text-blue-500" />
                        Modify My Post
                      </button>
                      <button type="button" onClick={() => setDeleting(post)} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                        <FaTrash className="text-red-500" />
                        Delete My Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </section>

      {open && (
        <Modal title="Create a new post" setOpen={setOpen}>
          <PostForm
            onSuccess={() => {
              setOpen(false);
              setPage(1);
              reload();
            }}
          />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit post" setOpen={() => setEditing(null)}>
          <EditPostForm
            post={editing}
            onSuccess={() => {
              setEditing(null);
              reload();
            }}
          />
        </Modal>
      )}

      {deleting && (
        <DeletePostModal post={deleting} onClose={() => setDeleting(null)} onDeleted={handleDeleted} />
      )}
    </div>
  );
}