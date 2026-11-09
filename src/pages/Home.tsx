import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import Title from "../components/ui/title";

export default function Home() {
  return (
    <div className="home-page">
      <section className="flex min-h-[200px] items-center justify-center border-b border-slate-200 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(https://i.pinimg.com/736x/73/d8/0d/73d80d7106f3a70f9bdaa383d6fd4f31.jpg)] px-5 py-12 text-center sm:min-h-[260px] sm:py-16 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h2]:text-4xl [&_h2]:font-extrabold [&_h2]:tracking-tight">
        <h1 className="text-white text-[5rem]">My Blog</h1>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-12 [&>h1]:font-extrabold [&>h2]:font-extrabold">
        <Title>All Blogs</Title>
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          <div className="min-w-0 break-words rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 [&>h1]:mb-3 [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:font-bold [&>p]:leading-7 [&>p]:text-slate-500 [&>div:last-child]:mt-5 [&>div:last-child]:border-t [&>div:last-child]:border-slate-100 [&>div:last-child]:pt-4 [&>div:last-child]:text-slate-500">
            <img src="https://i.pinimg.com/736x/50/05/b4/5005b4c5de484f88930f43f92beb0c0e.jpg" alt="" className="h-40 w-full object-cover rounded-md" />
            <Title>title</Title>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, suscipit.</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <AiOutlineLike />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineComment />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 break-words rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 [&>h1]:mb-3 [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:font-bold [&>p]:leading-7 [&>p]:text-slate-500 [&>div:last-child]:mt-5 [&>div:last-child]:border-t [&>div:last-child]:border-slate-100 [&>div:last-child]:pt-4 [&>div:last-child]:text-slate-500">
            <img src="https://i.pinimg.com/736x/50/05/b4/5005b4c5de484f88930f43f92beb0c0e.jpg" alt="" className="h-40 w-full object-cover rounded-md" />
            <Title>title</Title>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, suscipit.</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <AiOutlineLike />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineComment />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 break-words rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 [&>h1]:mb-3 [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:font-bold [&>p]:leading-7 [&>p]:text-slate-500 [&>div:last-child]:mt-5 [&>div:last-child]:border-t [&>div:last-child]:border-slate-100 [&>div:last-child]:pt-4 [&>div:last-child]:text-slate-500">
            <img src="https://i.pinimg.com/736x/50/05/b4/5005b4c5de484f88930f43f92beb0c0e.jpg" alt="" className="h-40 w-full object-cover rounded-md" />
            <Title>title</Title>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, suscipit.</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <AiOutlineLike />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineComment />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 break-words rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 [&>h1]:mb-3 [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:font-bold [&>p]:leading-7 [&>p]:text-slate-500 [&>div:last-child]:mt-5 [&>div:last-child]:border-t [&>div:last-child]:border-slate-100 [&>div:last-child]:pt-4 [&>div:last-child]:text-slate-500">
            <img src="https://i.pinimg.com/736x/50/05/b4/5005b4c5de484f88930f43f92beb0c0e.jpg" alt="" className="h-40 w-full object-cover rounded-md" />
            <Title>title</Title>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, suscipit.</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <AiOutlineLike />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineComment />
                <div className="h-1 w-1 bg-black rounded-full"></div>
                <div>
                  <p>25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 [&>div]:min-w-10 [&>div]:rounded-xl [&>div]:border [&>div]:border-slate-200 [&>div]:bg-white [&>div]:px-3 [&>div]:py-2 [&>div]:text-center [&>div]:font-semibold [&>div]:text-slate-600">
          <div>prev</div>
          <div>1</div>
          <div>2</div>
          <div>next</div>
        </div>
      </section>
    </div>
  )
}
