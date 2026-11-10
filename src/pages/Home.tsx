import Title from "../components/ui/title";
import Pagination from "../components/ui/pagination";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const { posts, loading, error, page, setPage, totalPages } = usePosts({ pageSize: 8 });

  return (
    <div className="home-page">
      <section className="flex min-h-[200px] items-center justify-center border-b border-slate-200 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(https://i.pinimg.com/736x/73/d8/0d/73d80d7106f3a70f9bdaa383d6fd4f31.jpg)] px-5 py-12 text-center sm:min-h-[260px] sm:py-16 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h2]:text-4xl [&_h2]:font-extrabold [&_h2]:tracking-tight">
        <h1 className="text-white text-[5rem]">My Blog</h1>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-12 [&>h1]:font-extrabold [&>h2]:font-extrabold">
        <Title>All Blogs</Title>

        {loading && <p className="mt-7 text-slate-500">Loading posts...</p>}
        {error && <p role="alert" className="mt-7 text-red-500">Could not load posts: {error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="mt-7 text-slate-500">No posts yet. Be the first to publish one!</p>
        )}

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-0 break-words rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 [&>h1]:mb-3 [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:font-bold [&>p]:leading-7 [&>p]:text-slate-500 [&>div:last-child]:mt-5 [&>div:last-child]:border-t [&>div:last-child]:border-slate-100 [&>div:last-child]:pt-4 [&>div:last-child]:text-slate-500"
            >
              <img src={post.image_url} alt={post.title} loading="lazy" className="h-40 w-full object-cover rounded-md" />
              <Title>{post.title}</Title>
              <p className="line-clamp-3">{post.description}</p>
              <div className="text-sm">
                {new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
              </div>
            </div>
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </section>
    </div>
  );
}