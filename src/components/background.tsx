import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { elements } from "./background-elements";
import { useTheme } from '../context/ThemeContext';

const Background = React.memo(() => {
    const location = useLocation();
    const pathname = location.pathname; 

    const { color } = useTheme();

    const gradienBackground = `linear-gradient(to bottom, #131313, ${color} 25%, ${color} 75%, #131313)`;

    const opacityChoices = [1];
    const getRandomOpacity = () => opacityChoices[Math.floor(Math.random() * opacityChoices.length)];

    const variants = useMemo(() => ({
        initial: { x: -420, opacity: 0, y: -500 },
        animate: { x: 0, opacity: 1, y: 0 },
        exit: { x: 370, opacity: 0, y: 440 },
    }), []);

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [randomOpacities, setRandomOpacities] = useState(elements.map(() => getRandomOpacity()));

    useEffect(() => {
        setRandomOpacities(elements.map(() => getRandomOpacity()));
    }, [pathname]);

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

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const moveX = useTransform(mouseX, [0, windowSize.width], [50, -50]);
    const moveY = useTransform(mouseY, [0, windowSize.height], [25, -25]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }, [mouseX, mouseY]);

    // useEffect(() => {
    //     if (windowSize.width && windowSize.height) {
    //         window.addEventListener('mousemove', handleMouseMove);
    //     }
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, [handleMouseMove, windowSize]);

    return (
        <div className="absolute h-full w-full overflow-hidden">
            <div className="h-full w-full bg-black/0 z-[1] absolute"></div>
            <AnimatePresence mode="wait">
                <motion.div key={pathname}>
                {elements.map((elem, index) => (
                    <motion.div
                    key={index}
                    className={elem.className}
                    style={{
                        ...elem.style,
                        backgroundImage: gradienBackground,
                        x: moveX,
                        y: moveY,
                        rotate: -40,
                    }}
                    variants={variants}
                    initial="initial"
                    animate={{
                        ...variants.animate,
                        opacity: randomOpacities[index],
                    }}
                    exit="exit"
                    transition={{ duration: elem.transition.duration, ease: "linear" }}
                    />
                ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});

Background.displayName = 'Background';

export default Background;
