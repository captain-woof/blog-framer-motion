import { motion, useAnimation, useElementScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { Link } from "react-router-dom";
import { useCustomScrollbar } from "../../../hooks/useCustomScrollbar";
import { useKeyboardScroll } from "../../../hooks/useKeyboardScroll";
import { useMobileScroll } from "../../../hooks/useMobileScroll";
import { usePosts } from "../../../hooks/usePosts";
import "./styles.scss";

export default function PostsCarousel() {

    const { data, isError, isFetched, isLoading, isSuccess } = usePosts();

    // For mobile scrolling
    const { carouselContainerRef, carouselScrollWidth, setNewCarouselWidth } = useMobileScroll();

    // For keyboard scrolling
    const { handleKeyboardScrolling, keyboardScrollAnim, setHover } = useKeyboardScroll(carouselScrollWidth, carouselContainerRef);

    // For custom scrollbar
    const { scrollbarDragControls, startScrollbarDrag, scrollbarContainerRef, scrollbarDragMotionValue, carouselX } = useCustomScrollbar(carouselScrollWidth);


    return (

        <div className="carousel" onWheel={handleKeyboardScrolling}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >

            {/* Actual carousel */}
            <motion.div className="carousel-container" ref={carouselContainerRef} drag="x" dragConstraints={{
                right: 0,
                left: -(carouselScrollWidth - (carouselContainerRef.current?.clientWidth || 0))
            }} onLoad={setNewCarouselWidth} animate={keyboardScrollAnim} transition={{ duration: 0.5 }} style={{ x: carouselX }}>
                {isFetched &&
                    data?.map(({ author, content, id }) => (
                        <Link key={id} to={`/post/${id}`}>
                            <figure className="carousel-container__post" onClick={() => { console.log("select") }}>
                                <img src={content.heroImage} alt={content.title} className="carousel-container__post__image"></img>
                                <figcaption className="carousel-container__post__caption">
                                    <b>{content.title}</b><br />
                                    - <i>{author.name}</i>
                                </figcaption>
                            </figure>
                        </Link>
                    ))
                }
            </motion.div>

            {/* Custom scrollbar */}
            <motion.div className="carousel-scrollbar" onPointerDown={startScrollbarDrag} ref={scrollbarContainerRef}>
                <motion.button className="carousel-scrollbar__bar" aria-label="Scroll bar" drag="x" dragControls={scrollbarDragControls} dragConstraints={scrollbarContainerRef} dragTransition={{ bounceDamping: 50 }} style={{ x: scrollbarDragMotionValue }} />
            </motion.div>
        </div>
    );
}
