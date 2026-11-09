export default function PostDetails() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
            <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-2xl sm:p-6 lg:grid-cols-2 lg:gap-8">

                <article className="min-w-0">
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200">
                        <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Mountain lake at sunrise"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 sm:p-8">

                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                            The Art of Slow Living: Finding Peace in a Fast World
                        </h1>

                        <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <img src="https://i.pravatar.cc/32?img=12" alt="author" className="w-7 h-7 rounded-full object-cover ring-2 ring-white" />
                                <span className="font-medium text-slate-700">Maya Chen</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>March 12, 2025</span>
                        </div>

                        <p className="mt-5 text-slate-600 leading-relaxed text-base sm:text-[1.05rem]">
                            In a world that glorifies hustle and constant productivity, there’s a quiet rebellion in slowing down.
                            Discover how embracing stillness, mindful moments, and intentional pauses can transform your daily life.
                            This article explores practical ways to reclaim your time and attention without guilt.
                        </p>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                            <a href="#"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors group">
                                <span className="text-xl group-hover:scale-110 transition-transform inline-block">♡</span>
                                <span className="font-medium">128</span>
                                <span className="text-sm text-slate-400 group-hover:text-rose-400">likes</span>
                            </a>
                            <div className="flex items-center gap-1 text-slate-500">
                                <span className="text-lg">💬</span>
                                <span className="text-sm font-medium">6</span>
                                <span className="text-sm">comments</span>

                            </div>
                        </div>
                    </div>
                </article>

                <section className="flex min-w-0 flex-col">

                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <span className="text-indigo-500"></span> COMMENTS
                    </h2>

                    <div className="mt-5 space-y-4 pr-1 lg:max-h-[32rem] lg:overflow-y-auto">

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=5" alt="Lena Fischer" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">Lena Fischer</span>
                                    <span className="text-[11px] text-slate-400">2 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">This resonates so much. I started taking slow walks without my phone, and it’s changed everything.</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=8" alt="James Okonkwo" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">James Okonkwo</span>
                                    <span className="text-[11px] text-slate-400">4 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">The part about “intentional pauses” is key. Even 5 minutes of doing nothing feels radical.</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=9" alt="Sofia Rivera" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">Sofia Rivera</span>
                                    <span className="text-[11px] text-slate-400">7 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">Beautifully written. I’d love to read more about how to incorporate slow living in a busy city.</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=11" alt="David Kim" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">David Kim</span>
                                    <span className="text-[11px] text-slate-400">9 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">I’ve been trying to slow down but it’s hard. Any tips for not feeling guilty?</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=20" alt="Aisha Rahman" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">Aisha Rahman</span>
                                    <span className="text-[11px] text-slate-400">12 hours ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">The photo alone made me exhale. Wonderful piece.</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <img src="https://i.pravatar.cc/40?img=15" alt="Tom Becker" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-slate-800">Tom Becker</span>
                                    <span className="text-[11px] text-slate-400">1 day ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">Slow living doesn’t mean lazy – it’s about being present. Thanks for this reminder.</p>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                                    <a href="#" className="hover:text-indigo-500 font-medium">Like</a>
                                    <a href="#" className="hover:text-indigo-500 font-medium">Reply</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <form className="mt-4 flex items-start gap-3 border-t border-slate-200 pt-4" action="#" method="post">
                        <img src="https://i.pravatar.cc/40?img=7" alt="your avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <textarea
                                name="comment"
                                placeholder="Write a comment..."
                                className="w-full min-h-24 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-y bg-slate-50 placeholder:text-slate-400"
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

            </div>
        </section>
    )
}
