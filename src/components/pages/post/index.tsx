import { useMemo } from "react";
import { useParams } from "react-router-dom"
import { usePosts } from "../../../hooks/usePosts";
import "./styles.scss";

export default function PostPage() {

    // Getting the post from cache
    const params = useParams();
    const { data } = usePosts();
    const post = useMemo(() => data?.find((post) => post.id.toString() === params.id), [data, params]);

    return (
        <main className="post-page-container">

            <article className="post-page-container__article">

                {/* Hero image */}
                <img src={post?.content.heroImage} alt={post?.content.title} className="post-page-container__article__heroImage" />

                {/* Post title */}
                <h1 className="post-page-container__article__title read">{post?.content.title}</h1>

                {/* Author and date of publication */}
                <section className="post-page-container__article__authorAndDate read">
                    {/* Author details */}
                    <div className="post-page-container__article__authorAndDate__authorContainer">
                        <img className="post-page-container__article__authorAndDate__authorContainer__dp" src={post?.author.profilePic} alt={`Profile picture of ${post?.author.name}`} />
                        <span className="post-page-container__article__authorAndDate__authorContainer__name">{post?.author.name}</span>
                    </div>

                    {/* Date */}
                    <time dateTime={(new Date(!!post?.date ? (post.date * 1000) : 0)).toISOString()} className="post-page-container__article__authorAndDate__date">
                        {(new Date(!!post?.date ? (post.date * 1000) : 0)).toLocaleString()}
                    </time>
                </section>

                {/* Post content */}
                <section className="post-page-container__article__body read">
                    {post?.content.body.split("\n").map((paragraphText, index) => (
                        <p className="post-page-container__article__body__paragraph">
                            {paragraphText}
                        </p>
                    ))}
                </section>

            </article>
        </main>
    )
}