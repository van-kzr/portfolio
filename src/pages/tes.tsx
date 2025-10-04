"use client";

import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Scrollbar from "smooth-scrollbar";

import Home from '../pages/home';
import Project from '../pages/project';

export default function Layout() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.08,         // kelancaran scroll
      alwaysShowTracks: true,
      continuousScrolling: true, // penting untuk touch di mobile
    });

    return () => {
      scrollbar.destroy();
    };
  }, []);

  return (
    <div className="h-screen w-screen relative" style={{ background: "linear-gradient(180deg, #0B0B0B 0%, #171717 100%)" }}>
      
      {/* Scrollable Container */}
      <div ref={scrollRef} style={{ height: "100%", overflow: "hidden" }}>
        <div className="px-5 min-[620px]:px-10 min-[820px]:px-16 min-2xl:px-24 relative z-20">

          {/* Header */}
          <div className="h-[10vh] w-full flex items-center">
            <h1 className="font-port_lligat_slab text-2xl min-2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AY
            </h1>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="w-full z-10"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
