'use client'

// import TextStrokeWrapper from "@/components/stroke-teks";
import { motion } from "framer-motion";

const Home = () => {

	
	const gradienBackground = `linear-gradient(to bottom, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF`;

	const variant = {
		initial: { x: -100, opacity: 1},
		animate: { x: 0, opacity: 1},
		exit: { x: 100, opacity: 1},
	}

	const skills = [
		{ id: 1, name: 'HTML', icon: 'https://skillicons.dev/icons?i=html' },
		{ id: 2, name: 'CSS', icon: 'https://skillicons.dev/icons?i=css' },
		{ id: 3, name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=javascript' },
		{ id: 4, name: 'PHP', icon: 'https://skillicons.dev/icons?i=php' },
		{ id: 5, name: 'React', icon: 'https://skillicons.dev/icons?i=react' },
		{ id: 6, name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' },
		{ id: 7, name: 'Angular', icon: 'https://skillicons.dev/icons?i=angular' },
		{ id: 8, name: 'Vue.js', icon: 'https://skillicons.dev/icons?i=vue' },
		{ id: 9, name: 'TailwindCSS', icon: 'https://skillicons.dev/icons?i=tailwind' },
		{ id: 10, name: 'Laravel', icon: 'https://skillicons.dev/icons?i=laravel' },
	];

	return (
		<div className={`h-full w-full flex items-center justify-center custom-hidden`}>
			<div className={`flex flex-col justify-center items-center pt-80 gap-4`}>
				<div className="w-full flex flex-col gap-2">
					<h1 className="lg:text-2xl">Hi my name is</h1>
					<motion.div variants={variant} initial='initial' animate='animate' exit='exit' transition={{type: "tween", duration: 0.6, ease: "easeOut"}}>
						<div className='text-4xl sm:text-5xl md:text-7xl text-[#c5c5c5] leading-3 xl:leading-none'><h1 className={`bg-clip-text text-transparent`} style={{backgroundImage: gradienBackground}}>AHMAD YOVAN ARDIANSYAH</h1></div>
					</motion.div>
				</div>
				<motion.div className="max-w-96 sm:max-w-lg lg:max-w-xl xl:max-w-3xl" variants={variant} initial="initial" animate="animate" exit="exit" transition={{ type: "tween", duration: 0.6, ease: "easeOut" }} >
					<h2 className="text-xs sm:text-lg lg:text-2xl text-center text-[#f7f6f6]">
						I am just beginning my journey in programming, with a strong determination 
						to continuously learn and grow. I am eager to explore more in-depth topics like web 
						development, applications, and other technologies.
					</h2>
				</motion.div>
				<motion.div className="w-full flex flex-col justify-center items-center gap-2 text-[#f7f6f6]" variants={variant} initial="initial" animate="animate" exit="exit" transition={{ type: "tween", duration: 0.6, ease: "easeOut" }} >
					<h1 className="text-xs sm:text-lg lg:text-2xl text-center hidden-when-max-h-390">
						skill and technologies that i use
					</h1>
					<div className="w-full min-w-72 px-1 max-w-96 sm:min-w-72 sm:max-w-lg lg:max-w-xl xl:max-w-3xl flex justify-center items-center gap-3 lg:gap-5 flex-wrap">
						{skills.map((skill) => (
							<img key={skill.id} src={skill.icon} alt={skill.name} title={skill.name} className="h-8 w-8 md:h-8 md:w-8" />
						))}
					</div>
				</motion.div>
				<div>
					<button className="px-4 py-2 text-lg lg:text-2xl text-[#f7f6f6] bg-[#191919] rounded-lg">see my project</button>
				</div>
			</div>			
		</div>
	);
};

export default Home

