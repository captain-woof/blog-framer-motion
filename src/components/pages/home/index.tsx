import PostsCarousel from "./postsCarousel";
import "./styles.scss";

export default function HomePage() {
    return (
        <main className="blog-homepage-container">
            <h1 className="blog-title">Just another blog</h1>
            <PostsCarousel />
        </main>
    );
}