import { BrowserRouter, Route, Routes } from "react-router";
import Nav from "./components/nav";
import Home from "./pages/Home";
import MyPost from "./pages/MyPost";
import Footer from "./components/footer";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./components/protectedRoute";


export default function App() {
  return (
    <div className=" flex min-h-screen flex-col bg-[#f6f8fc] text-slate-800 antialiased">
        <BrowserRouter>
            <Nav />
            <main className="w-full flex-1">
            <Routes>
                <Route index element={<Home />}></Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/mypost" element={<MyPost />}></Route>
                </Route>
                <Route path="/postdetails" element={<PostDetails />}></Route>
            </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    </div>
  )
}