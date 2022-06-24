import { motion, useElementScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "../../../hooks/usePosts";
import "./styles.scss";

export default function PostsCarousel() {

    const { data, isError, isFetched, isLoading, isSuccess } = usePosts();

    return (
        <div className="carousel-container">
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
        </div>
    );
}
