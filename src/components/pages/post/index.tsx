import { useMemo } from "react";
import { useParams } from "react-router-dom"
import { usePosts } from "../../../hooks/usePosts";
import { motion, Variants } from "framer-motion";
import "./styles.scss";

export default function PostPage() {

    // Getting the post from cache
    const params = useParams();
    const { data } = usePosts();
    const post = useMemo(() => data?.find((post) => post.id.toString() === params.id), [data, params]);

    // For post variants
    const variants: Variants = useMemo(() => ({
        initial: {
            y: 50,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.35,
                ease: "easeOut"
            }
        }
    }), []);

    const variantsStagger: Variants = useMemo(() => ({
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }), []);

    return (
        <motion.main className="post-page-container" initial="initial" animate="animate" exit="exit" variants={variantsStagger}>

            <motion.article className="post-page-container__article">

                {/* Hero image */}
                <img src={post?.content.heroImage} alt={post?.content.title} className="post-page-container__article__heroImage" />

                {/* Post title */}
                <motion.h1 className="post-page-container__article__title read" variants={variants}>
                    {post?.content.title}
                </motion.h1>

                {/* Author and date of publication */}
                <motion.section className="post-page-container__article__authorAndDate read" variants={variants}>
                    {/* Author details */}
                    <div className="post-page-container__article__authorAndDate__authorContainer">
                        <img className="post-page-container__article__authorAndDate__authorContainer__dp" src={post?.author.profilePic} alt={`Profile picture of ${post?.author.name}`} />
                        <span className="post-page-container__article__authorAndDate__authorContainer__name">{post?.author.name}</span>
                    </div>

                    {/* Date */}
                    <time dateTime={(new Date(!!post?.date ? (post.date * 1000) : 0)).toISOString()} className="post-page-container__article__authorAndDate__date">
                        {(new Date(!!post?.date ? (post.date * 1000) : 0)).toLocaleString()}
                    </time>
                </motion.section>

                {/* Post content */}
                <motion.section className="post-page-container__article__body read" variants={variantsStagger}>
                    {post?.content.body.split("\n").map((paragraphText, index) => (
                        <motion.p className="post-page-container__article__body__paragraph" variants={variants} key={index}>
                            {paragraphText}
                        </motion.p>
                    ))}
                </motion.section>

            </motion.article>
        </motion.main>
    )
}