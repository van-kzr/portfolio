'use client'

import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, easeIn } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Navigation = () => {
    const location = useLocation();
    const { color } = useTheme();

    const url = {
        landing: '/',
        project: '/project'
    };

    const linkVariants = {
        initial: { width: '100%' },
        animate: (isActive: boolean) => ({
            width: isActive ? '100%' : '50%',
            originY: 1000,
            backgroundColor: isActive ? color : '#ABABAB',
            transition: {
                duration: 0.6,
                ease: easeIn
            }
        }),
        hover: {
            backgroundColor: '#8A8A8A',
            transition: { duration: 0.2 }
        }
    };

    const links = [
        { href: url.landing, id: 'landing' },
        { href: url.project, id: 'project' }
    ];

    return (
        <AnimatePresence mode="wait">
            <div className="w-5 min-xl:w-10 min-2xl:w-16 flex flex-col items-start gap-5">
                {links.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                        <motion.div key={link.id} variants={linkVariants} custom={isActive} initial="initial" animate="animate" exit="exit" whileHover="hover" className="h-1 w-1/2 min-2xl:h-[6px] rounded-sm bg-gradient-to-r from-cyan-400 to-blue-500" >
                            <NavLink to={link.href}>
                               <div className="w-full h-full"></div> 
                            </NavLink>
                        </motion.div>
                    );
                })}
            </div>
        </AnimatePresence>
    );
};

export default Navigation;
