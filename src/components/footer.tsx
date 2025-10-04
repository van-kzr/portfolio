import { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  // Update saat resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[10dvh] w-full items-center pt-10 flex relative">
      {isMobile ? (
        <div className="relative h-20 w-full">
          <h2
            className="absolute text-[#B1B2B5] font-adamina left-0 top-0 translate-y-1/3 origin-left [writing-mode:vertical-rl] text-xs"
            style={{ fontFamily: "Adamina, serif" }}
          >
            van.kzr@gmail.com
          </h2>
        </div>
      ) : (
        <div className="absolute bottom-10 flex gap-2">
          <div className="w-2 rounded-[1px] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          <h2
            className="text-[#B1B2B5] font-adamina text-xs min-2xl:text-lg"
            style={{ fontFamily: "Adamina, serif" }}
          >
            van.kzr@gmail.com
          </h2>
        </div>
      )}
    </div>
  );
};

export default Footer;
