"use client";
import { useEffect, useRef, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
  speed?: number;      // kecepatan scroll mouse
  touchSpeed?: number; // kecepatan scroll touch
  lerpFactor?: number; // kehalusan animasi (0–1)
  damping?: number;    // faktor dumping/inertia (0–1), semakin kecil semakin lama meluncur
};

export default function SmoothScroll({
  children,
  speed = 0.5,
  touchSpeed = 0.8,
  lerpFactor = 0.3,
  damping = 0.92,
}: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const velocity = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const lerp = (start: number, end: number, amt: number) => start * (1 - amt) + end * amt;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocity.current += e.deltaY * speed;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      velocity.current = 0; // reset velocity saat mulai touch
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      velocity.current += delta * touchSpeed;
      touchStartY.current = e.touches[0].clientY;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    const update = () => {
      // update target scroll dengan velocity
      targetScroll.current += velocity.current;

      // batasi scroll
      targetScroll.current = Math.max(0, Math.min(targetScroll.current, container.scrollHeight - container.clientHeight));

      // interpolasi scroll
      currentScroll.current = lerp(currentScroll.current, targetScroll.current, lerpFactor);
      container.scrollTo(0, currentScroll.current);

      // apply damping untuk efek inertia
      velocity.current *= damping;

      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [speed, touchSpeed, lerpFactor, damping]);

  return (
    <div ref={scrollRef} className="scrollable-content overflow-hidden h-full">
      {children}
    </div>
  );
}
