'use client';

import { motion } from "framer-motion";
// import TextStrokeWrapper from "../components/stroke-teks";

const Home = () => {

	const variant = {
		initial: { x: -100, opacity: 1 },
		animate: { x: 0, opacity: 1 },
		exit: { x: 100, opacity: 1 },
	};	

	return (
		<div className="h-full w-full flex items-center justify-center custom-hidden">
			<div className="h-full w-full flex flex-col items-center justify-center">
				<div className="relative min-h-10 h-full w-full flex my-36 flex-col items-center justify-center gap-5">
					<div className="w-fit h-fit p-5 px-10 flex min-h-10 flex-col justify-center items-center gap-3">
						<div className="w-full flex flex-col justify-center items-center gap-2">
							<motion.div variants={variant} initial="initial" animate="animate" exit="exit" transition={{ type: "tween", duration: 0.6, ease: "easeOut" }} >
								<div className="text-2xl sm:text-3xl lg:text-3xl lg:py-5 text-[#f7f6f6]">
									ABOUT
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
