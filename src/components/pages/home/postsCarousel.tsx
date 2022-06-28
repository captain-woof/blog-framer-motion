import { motion, useAnimation, useElementScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { Link } from "react-router-dom";
import { useCustomScrollbar } from "../../../hooks/useCustomScrollbar";
import { useKeyboardScroll } from "../../../hooks/useKeyboardScroll";
import { useMobileScroll } from "../../../hooks/useMobileScroll";
import { usePosts } from "../../../hooks/usePosts";
import { usePostSelect } from "../../../hooks/usePostSelect";
import "./styles.scss";

export default function PostsCarousel() {

    const { data, isError, isFetched, isLoading, isSuccess } = usePosts();

    // For mobile scrolling
    const { carouselContainerRef, carouselScrollWidth, setNewCarouselWidth } = useMobileScroll();

    // For keyboard scrolling
    const { handleKeyboardScrolling, keyboardScrollAnim, setHover } = useKeyboardScroll(carouselScrollWidth, carouselContainerRef);

    // For custom scrollbar
    const { scrollbarDragControls, startScrollbarDrag, scrollbarContainerRef, scrollbarDragMotionValue, carouselX } = useCustomScrollbar(carouselScrollWidth);

    // For post select
    const { selectedPost, setSelectedPost, postVariants, carouselVariants } = usePostSelect();

    return (

        <motion.div className="carousel" onWheel={handleKeyboardScrolling}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >

            {/* Top hero image for page transition */}
            {!!selectedPost &&
                <motion.img layoutId={selectedPost.id.toString()} src={selectedPost.content.heroImage} alt={selectedPost.content.title} className="selected-post-hero-img" />
            }

            {/* Actual carousel */}
            <motion.div className="carousel-container" ref={carouselContainerRef} drag="x" dragConstraints={{
                right: 0,
                left: -(carouselScrollWidth - (carouselContainerRef.current?.clientWidth || 0))
            }} onLoad={setNewCarouselWidth} animate={keyboardScrollAnim} transition={{ duration: 0.5 }} style={{ x: carouselX }} exit="exit" variants={carouselVariants}>
                {isFetched &&
                    data
                        ?.filter((post) => post.id !== selectedPost?.id)
                        ?.map((post) => (
                            <motion.figure key={post.id} className="carousel-container__post" onClick={() => { setSelectedPost(post) }} layout variants={postVariants}>
                                <motion.img src={post.content.heroImage} alt={post.content.title} className="carousel-container__post__image" layoutId={post.id.toString()} />
                                <figcaption className="carousel-container__post__caption">
                                    <b>{post.content.title}</b><br />
                                    - <i>{post.author.name}</i>
                                </figcaption>
                            </motion.figure>
                        ))
                }
            </motion.div>

            {/* Custom scrollbar */}
            <motion.div className="carousel-scrollbar" onPointerDown={startScrollbarDrag} ref={scrollbarContainerRef}>
                <motion.button className="carousel-scrollbar__bar" aria-label="Scroll bar" drag="x" dragControls={scrollbarDragControls} dragConstraints={scrollbarContainerRef} dragTransition={{ bounceDamping: 50 }} style={{ x: scrollbarDragMotionValue }} />
            </motion.div>
        </motion.div>
    );
}
