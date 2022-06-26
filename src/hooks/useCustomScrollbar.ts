import { useDragControls, useMotionValue, useSpring } from "framer-motion"
import { PointerEvent, useCallback, useEffect, useRef } from "react";

export const useCustomScrollbar = (carouselScrollWidth: number) => {

    const scrollbarDragControls = useDragControls();
    const scrollbarContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollbarDragMotionValue = useMotionValue(0);

    const carouselX = useSpring(0, { mass: 1, damping: 30 });

    const startScrollbarDrag = useCallback((e: PointerEvent) => {
        scrollbarDragControls.start(e, { snapToCursor: true });
    }, [scrollbarDragControls]);

    useEffect(() => {
        const unsubscribe = (scrollbarDragMotionValue as any).onChange(() => {
            const progress = (!!scrollbarContainerRef.current) ? (scrollbarDragMotionValue.get() / (scrollbarContainerRef.current.clientWidth - 128)) : 0;
            carouselX.set(-(progress * (carouselScrollWidth - (scrollbarContainerRef.current?.clientWidth || 0))));
        });

        return unsubscribe;
    }, [scrollbarDragMotionValue, carouselScrollWidth])

    return {
        scrollbarDragControls,
        startScrollbarDrag,
        scrollbarContainerRef,
        scrollbarDragMotionValue,
        carouselX
    }
}