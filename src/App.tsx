import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/home";
import PostPage from "./components/pages/post";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  )
}
