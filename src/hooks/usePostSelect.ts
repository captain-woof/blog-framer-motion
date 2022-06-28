import { Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/posts"

export const usePostSelect = () => {

    // Selected post
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    // Post variants (disapper on exit)
    const carouselVariants: Variants = useMemo(() => ({
        exit: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }), []);
    const postVariants: Variants = useMemo(() => ({
        exit: {
            opacity: 0,
            transition: {
                ease: "easeInOut",
                duration: 0.3
            }
        }
    }), []);

    // For navigating to post page
    const navigate = useNavigate();
    useEffect(() => {
        if (!!selectedPost) {
            navigate(`/post/${selectedPost.id}`);
        }
    }, [selectedPost])

    return {
        selectedPost,
        setSelectedPost,
        postVariants,
        carouselVariants
    }
}