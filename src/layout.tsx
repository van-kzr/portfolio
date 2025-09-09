import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from './components/navigation';
import Background from './components/background';
import { useTheme } from './context/ThemeContext';

import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';

const SCROLL_DELAY = 1000;

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const routes = useMemo(() => ['/', '/about', '/project'], []);
  const { color } = useTheme();

  const [isNavigating, setIsNavigating] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const lastNavigationTime = useRef(Date.now());

  const handleNavigation = useCallback((direction: number) => {
    const now = Date.now();

    if (isNavigating || now - lastNavigationTime.current < SCROLL_DELAY) {
      return;
    }

    const currentIndex = routes.indexOf(pathname);
    const newIndex = (currentIndex + direction + routes.length) % routes.length;

    if (newIndex !== currentIndex) {
      setIsNavigating(true);
      lastNavigationTime.current = now;
      navigate(routes[newIndex]);

      setTimeout(() => {
        setIsNavigating(false);
      }, SCROLL_DELAY);
    }
  }, [isNavigating, pathname, navigate, routes]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      handleNavigation(direction);
    },
    [handleNavigation]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isNavigating) touchStartY.current = e.touches[0].clientY;
  }, [isNavigating]);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartY.current === null || isNavigating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 50) {
        const direction = diffY > 0 ? 1 : -1;
        handleNavigation(direction);
      }

      touchStartY.current = null;
    },
    [handleNavigation, isNavigating]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#131313]">
      <div className="h-full w-full z-10 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-24 lg:flex items-center justify-end z-20 hidden">
          <Navigation />
        </div>

        <div className="h-full w-full">
          {/* <div className="w-full absolute top-0 flex flex-col justify-center items-center pt-3">
            <ChevronUp color={color} size={24} />
            <ChevronUp className="-translate-y-3" color={color} size={24} />
          </div> */}

          {/* Routing + AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="h-full w-full z-10 px-5"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Project />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <div className="w-full absolute bottom-0 flex flex-col justify-center items-center py-4">
            <ChevronDown className="translate-y-3" color={color} size={24} />
            <ChevronDown color={color} size={24} />
          </div>
        </div>
      </div>

      <div className="absolute opacity-70 h-full w-full">
        <Background />
      </div>

      <div className="w-full h-32 px-24 flex gap-3 items-center">
        <span className="w-6 h-6 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="currentColor">
            <path d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" />
            <path d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </span>
        <h1>van.kzr@gmail.com</h1>
      </div>
    </div>
  );
}
