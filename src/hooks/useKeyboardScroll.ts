import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useState, WheelEvent } from "react";

export const useKeyboardScroll = (carouselScrollWidth: number, carouselContainerRef: React.MutableRefObject<HTMLDivElement | null>) => {
    const [hover, setHover] = useState<boolean>(false);
    const [shift, setShift] = useState<boolean>(false);
    const [scrolledWidth, setScrolledWidth] = useState<number>(0);
    const keyboardScrollAnim = useAnimation();

    useEffect(() => {
        const handleShiftKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                setShift(true);
            }
        }

        const handleShiftKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                setShift(false);
            }
        }

        window.addEventListener("keydown", handleShiftKeyDown);
        window.addEventListener("keyup", handleShiftKeyUp);

        return () => {
            window.removeEventListener("keydown", handleShiftKeyDown);
            window.removeEventListener("keyup", handleShiftKeyUp);
        }
    }, [])

    const handleKeyboardScrolling = useCallback(async (e: WheelEvent<HTMLDivElement>) => {
        if (hover && shift) {
            const totalPossibleScroll = carouselScrollWidth - (carouselContainerRef.current?.clientWidth || 0);
            if (e.deltaY > 0) { // Down                
                if (scrolledWidth < totalPossibleScroll) {
                    const maxPossibleScroll = Math.min(100, totalPossibleScroll - scrolledWidth);
                    setScrolledWidth((prevScrolledWidth) => prevScrolledWidth + maxPossibleScroll);
                    keyboardScrollAnim.start({
                        x: -(scrolledWidth + maxPossibleScroll)
                    });
                }
            } else { // Up
                if (scrolledWidth > 0) {
                    const maxPossibleScroll = Math.min(100, scrolledWidth);
                    setScrolledWidth((prevScrolledWidth) => prevScrolledWidth - maxPossibleScroll);
                    keyboardScrollAnim.start({
                        x: (-scrolledWidth + maxPossibleScroll)
                    });
                }
            }
        }
    }, [hover, shift, keyboardScrollAnim, scrolledWidth, carouselScrollWidth, carouselContainerRef]);

    return {
        setHover,
        handleKeyboardScrolling,
        keyboardScrollAnim
    }
}