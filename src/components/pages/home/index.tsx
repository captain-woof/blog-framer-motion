import PostsCarousel from "./postsCarousel";
import { motion } from "framer-motion";
import "./styles.scss";

export default function HomePage() {
    return (
        <motion.main className="blog-homepage-container" initial="initial" animate="animate" exit="exit">
            <h1 className="blog-title">Just another blog</h1>
            <PostsCarousel />
        </motion.main>
    );
}