import { useState } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import Modal from "../components/modal";
import PostForm from "../components/forms/postForm";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MyPost() {
  const [open, setOpen] = useState(false);

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

          <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/70">
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src="https://i.pinimg.com/736x/50/05/b4/5005b4c5de484f88930f43f92beb0c0e.jpg"
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6 sm:p-7">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  title
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, suscipit.
                </p>

                <div className="mt-6 flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-10">
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

                  <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                      <FaEdit className="text-blue-500" />
                      Modify My Post
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                      <FaTrash className="text-red-500" />
                      Delete My Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button className="inline-flex min-w-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
              Prev
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200">
              1
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
              2
            </button>
            <button className="inline-flex min-w-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
              Next
            </button>
          </div>
        </div>
      </section>

      {open && (
        <Modal title="Create a new post" setOpen={setOpen}>
          <PostForm />
        </Modal>
      )}
    </div>
  );
}