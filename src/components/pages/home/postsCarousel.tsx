import { motion, useElementScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "../../../hooks/usePosts";
import "./styles.scss";

export default function PostsCarousel() {

    const { data, isError, isFetched, isLoading, isSuccess } = usePosts();

    // Set width of sentinel element
    const carouselContainerRef = useRef<HTMLDivElement | null>(null);
    const [sentinelDimension, setSentinelDimension] = useState<{ height: number, width: number }>({ height: 0, width: 0 });
    useEffect(() => {
        const updateSentinelWidth = () => {
            if (!!carouselContainerRef.current) {
                let newSentinelWidth = 0;
                for (let postEle of carouselContainerRef.current.children) {
                    newSentinelWidth += postEle.clientWidth;
                }
                setSentinelDimension({ width: newSentinelWidth, height: carouselContainerRef.current.clientHeight });
            }
        }
        window.addEventListener("load", updateSentinelWidth);
        window.addEventListener("resize", updateSentinelWidth);

        return () => {
            window.removeEventListener("load", updateSentinelWidth);
            window.removeEventListener("resize", updateSentinelWidth);
        }
    }, [carouselContainerRef, data]);

    // For smooth scroll
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { scrollX: carouselScrollX } = useElementScroll(scrollRef);
    const scrollXActual = useTransform(carouselScrollX, (scrollXVal) => (-scrollXVal));
    const scrollXSmooth = useSpring(scrollXActual, { mass: 2, damping: 30 });

    // For smooth scroll on mobile
    const [isBeingPanned, setIsBeingPanned] = useState<boolean>(false);

    return (
        <div className="carousel">

            <motion.div className="carousel-container" ref={carouselContainerRef} style={{ x: scrollXSmooth, pointerEvents: isBeingPanned ? "none" : "auto" }}
                onTouchStart={() => { setIsBeingPanned(true) }}
                onTouchEnd={() => { setIsBeingPanned(false) }}
            >
                {isFetched &&
                    data?.map(({ author, content, id }) => (
                        <figure key={id} className="carousel-container__post" onClick={() => { console.log("select") }}>
                            <img src={content.heroImage} alt={content.title} className="carousel-container__post__image"></img>
                            <figcaption className="carousel-container__post__caption">
                                <b>{content.title}</b><br />
                                - <i>{author.name}</i>
                            </figcaption>
                        </figure>
                    ))
                }
            </motion.div>

            <div className="carousel-sentinel-container" ref={scrollRef}>
                <div className="carousel-sentinel-container__sentinel" style={{
                    width: `${sentinelDimension.width}px`,
                    height: `${sentinelDimension.height}px`,
                }} />
            </div>

        </div>
    );
}
