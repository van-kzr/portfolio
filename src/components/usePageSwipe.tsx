import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function usePageSwipe(routes: string[], currentPath: string) {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const lastNavigationTime = useRef(Date.now());
  const SCROLL_DELAY = 1000;

  const handleNavigation = useCallback((direction: number) => {
    const now = Date.now();
    if (isNavigating || now - lastNavigationTime.current < SCROLL_DELAY) return;

    const currentIndex = routes.indexOf(currentPath);
    const newIndex = (currentIndex + direction + routes.length) % routes.length;

    if (newIndex !== currentIndex) {
      setIsNavigating(true);
      lastNavigationTime.current = now;
      navigate(routes[newIndex]);

      setTimeout(() => setIsNavigating(false), SCROLL_DELAY);
    }
  }, [isNavigating, navigate, currentPath, routes]);


    const isTopVisible = (container: HTMLElement) => container.scrollTop <= 5;
    const isBottomVisible = (container: HTMLElement) => container.scrollTop + container.clientHeight >= container.scrollHeight - 5;


  const handleWheel = useCallback((e: WheelEvent) => {
    const container = document.querySelector<HTMLElement>('.scrollable-content');
    if (!container) return;

    const canScrollUp = container.scrollTop > 0;
    const canScrollDown = container.scrollTop + container.clientHeight < container.scrollHeight;

    if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) return;

    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    handleNavigation(direction);
  }, [handleNavigation]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isNavigating) return;
    touchStartY.current = e.touches[0].clientY;
  }, [isNavigating]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isNavigating || touchStartY.current === null) return;

    const container = document.querySelector<HTMLElement>('.scrollable-content');
    if (!container) return;

    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffY) < 50) return; // minimal swipe

    const direction = diffY > 0 ? 1 : -1;

    // Hanya navigasi jika sudah mentok
    if ((direction === 1 && isBottomVisible(container)) || (direction === -1 && isTopVisible(container))) {
  e.preventDefault();
  handleNavigation(direction);
}

    touchStartY.current = null;
  }, [handleNavigation, isNavigating]);

  return { handleWheel, handleTouchStart, handleTouchEnd };
}
