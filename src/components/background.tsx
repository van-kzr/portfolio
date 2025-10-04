import React, { useEffect, useMemo, useState } from 'react';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { elementsByPath } from "./background-elements";

const Background = React.memo(() => {
    const location = useLocation();
    const pathname = location.pathname; 
    // const [isAnimating, setIsAnimating] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const elements = useMemo(() => {
        return elementsByPath[pathname] || [];
    }, [pathname]);

    const variants = useMemo(() => ({
        initial: { x: 300, opacity: 0, y: -250 },
        animate: { x: 0, opacity: 1, y: 0 },
        exit: { x: 1, opacity: 0, y: 1 },
    }), []);

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const widthMotion = useMotionValue(windowWidth);

    useEffect(() => {
        widthMotion.set(windowWidth);
    }, [windowWidth, widthMotion]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

    const moveX = useTransform(mouseX, [0, windowSize.width], [0, -35]);
    const moveY = useTransform(mouseY, [0, windowSize.height], [0, -35]);

    useEffect(() => {
        if (!windowSize.width || !windowSize.height) return;

        const controlsX = animate(mouseX, window.innerWidth / 2, { duration: 0.6, ease: "easeOut" });
        const controlsY = animate(mouseY, window.innerHeight / 2, { duration: 0.6, ease: "easeOut" });

        return () => {
            controlsX.stop();
            controlsY.stop();
        };
    }, [pathname, mouseX, mouseY, windowSize]);

    // const handleMouseMove = useCallback(
    // (e: MouseEvent) => {
    //     animate(mouseX, e.clientX, { type: "spring", stiffness: 50, damping: 20 });
    //     animate(mouseY, e.clientY, { type: "spring", stiffness: 50, damping: 20 });
    // },
    // [mouseX, mouseY]
    // );

    // useEffect(() => {
    //     if (windowSize.width && windowSize.height) {
    //         window.addEventListener('mousemove', handleMouseMove);
    //     }
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, [handleMouseMove, windowSize]);

    const scale = useTransform(widthMotion, [320, 1920], [1, 2.45], {
        clamp: true,
    });

    return (
        <div className="absolute h-1/2 w-full bottom-0 right-0">
            <AnimatePresence mode="wait">
                <motion.div
                key={pathname}
                className="relative h-full"
                variants={variants} 
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                    scale, 
                    transformOrigin: "right bottom",
                }}>
                {elements.map((elem, index) => (
                    <motion.div
                    key={index}
                    className={elem.className}
                    style={{
                        ...elem.style,
                        background: "linear-gradient(0deg, rgba(19, 19, 19, 0) 0%, #00D8FF 15%, #008CFF 85%, rgba(19, 19, 19, 0) 100%)",
                        x: moveX,
                        y: moveY,
                        rotate: 50,
                    }}
                    transition={{ duration: elem.transition.duration, ease: "linear" }}
                    // onAnimationStart={() => setIsAnimating(true)}
                    // onAnimationComplete={() => setIsAnimating(false)}
                    />
                ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});

Background.displayName = 'Background';

export default Background;
