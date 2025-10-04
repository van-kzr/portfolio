// import TextStrokeWrapper from "@/components/stroke-teks";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Home = () => {
	// const gradienBackground = `linear-gradient(to bottom, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF`;

	const variant = {
		initial: { x: -100, opacity: 1},
		animate: { x: 0, opacity: 1},
		exit: { x: 100, opacity: 1},
	}


	return (
		<div className={`h-[80dvh] xl:h-[85dvh] transition-all duration-300 ease-in-out w-full flex items-center overflow-hidden`}>
			<div className={`flex flex-col justify-center gap-2 pb-56 min-[720px]:pb-1`}>
				<div className="flex flex-col gap-2 px-5 lg:px-16 xl:px-24 2xl:px-32 min-[1908px]:px-52">
					<div className="flex flex-col gap-2">
						<motion.div variants={variant} initial='initial' animate='animate' exit='exit' transition={{type: "tween", duration: 0.6, ease: "easeOut"}}>
							<h1 className='font-port_lligat_slab text-2xl lg:text-3xl xl:text-4xl min-[1908px]:text-5xl text-[#C2C2C2] flex gap-3'>Hi I’m<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AHMAD YOVAN</span></h1>
						</motion.div>
						<motion.div className="w-80 lg:w-md xl:w-lg min-[1908px]:w-2xl" variants={variant} initial="initial" animate="animate" exit="exit" transition={{ type: "tween", duration: 0.6, ease: "easeOut" }} >
							<h2 className="text-sm lg:text-base xl:text-lg min-[1908px]:text-2xl text-justify text-[#C2C2C2] font-adamina">
								Just starting my programming journey — excited to learn, build, and explore new technologies along the way.
							</h2>
						</motion.div>
					</div>
					<div className="flex justify-center min-lg:justify-start pt-5">
						<motion.div className="px-3 py-2 min-2xl:py-3 bg-[#1D1D1D] w-fit rounded-sm" variants={variant} initial="initial" animate="animate" exit="exit" transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}>
							<button className="text-md lg:text-lg xl:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-adamina"><NavLink to='/project'>see my work</NavLink> </button>
						</motion.div>
					</div>
				</div>
				
				<motion.div initial={{x: -100}} animate={{x: 0}} className="relative h-20 w-full min-[720px]:hidden">
					<h2 className="absolute text-[#B1B2B5] font-adamina left-0 top-0 translate-y-1/3  origin-left [writing-mode:vertical-rl] text-xs" style={{ fontFamily: "Adamina, serif" }}>
						van.kzr@gmail.com
					</h2>
				</motion.div>

				<div className="absolute bottom-10 overflow-hidden">
          <motion.div initial={{x: -100}} animate={{x: 0}} transition={{type: "tween", duration: 0.6, ease: "easeOut"}} className="hidden min-[720px]:flex gap-2">
            <div className="w-2 rounded-[1px] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <h2 className="text-[#B1B2B5] font-adamina text-xs min-2xl:text-lg" style={{ fontFamily: "Adamina, serif" }}>
              van.kzr@gmail.com
            </h2>
          </motion.div>
				</div>
        
			</div>			
		</div>
	);
};

export default Home

