"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ✅ Custom Hook untuk inView
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [options]);

  return { ref, inView };
}

// ✅ Tipe Project biar tidak pakai "any"
type Project = {
  image: string;
  name: string;
  description: string;
  tech: string[];
};

const ProjectItem = ({ project, i }: { project: Project; i: number }) => {
  const { ref, inView } = useInView({
  threshold: 0.3,
  rootMargin: "-15% 0px 0px 0px", // abaikan area header 15vh
});



  return (
    <div className={`h-40 xl:h-56 relative w-full `}>
        <motion.div
        ref={ref}
        key={i}
        className={`h-full translate-x-10 w-full flex flex-col gap-5 xl:gap-24 ${
            i % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"
        }`}
        initial={{ opacity: 0, x: i % 2 === 0 ? 100 : -100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? 100 : -100}}
        transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.2 }}
        >
        {/* Gambar */}
        <div className="w-full h-full 2xl:w-3xl">
            <img
            src={project.image}
            alt={project.name}
            className="w-full object-cover h-full rounded-sm"
            />
        </div>

        {/* Konten */}
        <div className="w-full flex flex-col gap-5 font-adamina">
            <div className="relative w-full flex flex-row gap-5 justify-center items-center">
            <div className="absolute right-0 flex items-center justify-between">
                <img
                src="https://skillicons.dev/icons?i=github"
                alt="GitHub"
                className="h-6 w-6 md:h-8 md:w-8"
                />
            </div>
            <h1 className="text-center text-sm lg:text-xl">{project.name}</h1>
            </div>

            <p className="text-justify text-xs lg:text-sm xl:text-lg overflow-hidden">
            {project.description}
            </p>

            {/* Tech Stack */}
            <div className="w-full flex">
            <div className="flex flex-col text-xs gap-2 lg:flex-row items-center flex-wrap">
                <h3 className="text-sm xl:text-lg">Tech Stack:</h3>
                <div className="flex gap-2 flex-wrap justify-center">
                {project.tech.map((tech, idx) => (
                    <div
                    key={idx}
                    className="flex gap-2 bg-[#1D1D1D] px-3 py-2 rounded-sm"
                    >
                    <h2 className="font-adamina text-xs min-2xl:text-lg">
                        {tech}
                    </h2>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </motion.div>
    </div>
    
  );
};

export default ProjectItem;
