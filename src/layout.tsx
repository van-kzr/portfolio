import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Background from './components/background';
// import { useTheme } from './context/ThemeContext';

import Home from './pages/home';
import Project from './pages/project';
import Navigation from './components/navigation';
import SmoothScroll from './components/smooth_scroll';
import usePageSwipe from './components/usePageSwipe';


const pageVariants: Variants = {
	initial: { opacity: 0},
	animate: {
		opacity: 1,
		transition: { duration: 0.5 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.55 },
	},
};

export default function Layout() {
	const location = useLocation();
	

	const routes = useMemo(() => ['/', '/project'], []);
	// const { color } = useTheme();

	const { handleWheel, handleTouchStart, handleTouchEnd } = usePageSwipe(routes, location.pathname);

	useEffect(() => {
	const container = document.querySelector<HTMLElement>('.scrollable-content');
	if (!container) return;

	container.addEventListener("wheel", handleWheel, { passive: false });
	container.addEventListener("touchstart", handleTouchStart, { passive: false });
	container.addEventListener("touchend", handleTouchEnd, { passive: false });

	return () => {
		container.removeEventListener("wheel", handleWheel);
		container.removeEventListener("touchstart", handleTouchStart);
		container.removeEventListener("touchend", handleTouchEnd);
	};
	}, [handleWheel, handleTouchStart, handleTouchEnd]);

	useEffect(() => {
		const setVH = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		setVH();
		window.addEventListener('resize', setVH);
		window.addEventListener('orientationchange', setVH);

		return () => {
			window.removeEventListener('resize', setVH);
			window.removeEventListener('orientationchange', setVH);
		};
	}, []);

	return (
		<div className="h-dvh relative" style={{ background: "linear-gradient(180deg, #0B0B0B 0%, #171717 70%)" }}>
			{/* Wrapper padding */}
			<div className="h-full px-5 min-[620px]:px-10 min-[820px]:px-16 min-2xl:px-24 relative z-20">
				
				{/* Navigation desktop */}
				<div className="absolute top-0 left-0 h-dvh justify-start items-center px-16 min-2xl:px-24 z-20 hidden min-lg:flex">
					<Navigation />
				</div>

				{/* Flex container vertical: header + content scrollable */}
				<div className="flex flex-col h-full">
				
					{/* Header */}
					<div className="h-[10dvh] xl:h-[15dvh] w-full flex items-center">
						<h1 className="font-port_lligat_slab text-2xl min-2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AY</h1>
					</div>

					{/* Content scrollable */}
					
					<SmoothScroll speed={0.4} touchSpeed={0.6} lerpFactor={0.04} damping={0.4}>              
					<AnimatePresence mode="wait">
						<motion.div
						key={location.pathname}
						className="w-full z-10"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={pageVariants}
						>
						<Routes location={location}>
							<Route path="/" element={<Home />} />
							<Route path="/project" element={<Project />} />
						</Routes>
						</motion.div>
					</AnimatePresence>
					</SmoothScroll>

					{/* <Footer /> */}
				</div>
			</div>

			{/* Background absolute */}
			<div className="absolute z-0 top-0 left-0 h-dvh w-full overflow-hidden transition-all duration-300 ease-in-out">
				<Background />
			</div>
		</div>
	);
}
