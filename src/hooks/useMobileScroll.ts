import { useCallback, useEffect, useRef, useState } from "react";

export const useMobileScroll = () => {
    const carouselContainerRef = useRef<HTMLDivElement | null>(null);
    const [carouselScrollWidth, setCarouselScrollWidth] = useState<number>(0);

    const setNewCarouselWidth = useCallback(() => {
        setCarouselScrollWidth(carouselContainerRef.current?.scrollWidth || 0);
    }, [carouselContainerRef]);

    useEffect(() => {
        window.addEventListener("resize", setNewCarouselWidth);
        return () => {
            window.removeEventListener("resize", setNewCarouselWidth);
        }
    }, [carouselContainerRef]);

    return {
        carouselContainerRef,
        carouselScrollWidth,
        setNewCarouselWidth
    }
}