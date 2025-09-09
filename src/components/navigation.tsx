'use client'

import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, easeIn } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Navigation = () => {
    const location = useLocation();
    const { color } = useTheme();

    const url = {
        landing: '/',
        about: '/about',
        project: '/project'
    };

    const linkVariants = {
        initial: { width: '100%' },
        animate: (isActive: boolean) => ({
            width: isActive ? '200%' : '100%',
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
        { href: url.about, id: 'about' },
        { href: url.project, id: 'project' }
    ];

    return (
        <AnimatePresence mode="wait">
            <div className="w-full flex flex-col gap-5 pl-24">
                {links.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                        <motion.div key={link.id} initial="initial" animate="animate" exit="exit" whileHover="hover" className="h-3 lg:h-2 w-10 lg:w-5 relative rounded-e-full" >
                            <NavLink to={link.href}>
                                <motion.div variants={linkVariants} custom={isActive} className="h-full w-full border-4 lg:border-2 border-solid border-[#131313] rounded-full" />
                            </NavLink>
                        </motion.div>
                    );
                })}
            </div>
        </AnimatePresence>
    );
};

export default Navigation;
