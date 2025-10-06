import { useMemo } from 'react';
import A1 from "../assets/a1.png";
import A2 from "../assets/a2.png";
import { motion } from 'framer-motion';
import ProjectItem from '../components/project-item';

const Home = () => {

	const projects = useMemo(() => [ 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			image: A1,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at feugiat augue. In quis porttitor dolor, ut fringilla metus. Nulla pretium interdum mattis. Fusce a eleifend felis, quis finibus enim. Nunc eu vehicula ex. Phasellus vel sem a odio posuere condimentum. ', 
			tech: ["next js", "Axum"]
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			image: A2,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at feugiat augue. In quis porttitor dolor, ut fringilla metus. Nulla pretium interdum mattis. Fusce a eleifend felis, quis finibus enim. Nunc eu vehicula ex. Phasellus vel sem a odio posuere condimentum. ', 
			tech: ["next js", "Axum"]
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			image: A1,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at feugiat augue. In quis porttitor dolor, ut fringilla metus. Nulla pretium interdum mattis. Fusce a eleifend felis, quis finibus enim. Nunc eu vehicula ex. Phasellus vel sem a odio posuere condimentum. ', 
			tech: ["next js", "Axum"]
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			image: A2,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at feugiat augue. In quis porttitor dolor, ut fringilla metus. Nulla pretium interdum mattis. Fusce a eleifend felis, quis finibus enim. Nunc eu vehicula ex. Phasellus vel sem a odio posuere condimentum. ', 
			tech: ["next js", "Axum"]
		}, 
	], []);

	return (
		<div className='h-full page-scroll'>
			
				<div className="w-full flex flex-col lg:gap-24 items-center ">
					<div className="flex items-center h-28 gap-3">
						<h1 className="text-xl xl:text-5xl font-port_lligat_slab font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">What I’ve Been Working On</h1>
					</div>

					<div className='w-full xl:w-7xl'>
						<div className="h-full w-full flex flex-col items-center justify-center text-neutral-300 gap-20 xl:gap-28">
						{projects.map((project, i) => (
							<ProjectItem key={i} project={project} i={i} />
						))}
						</div>
					</div>
					<div  className={`h-[12dvh] w-full flex items-center xl:pt-0 `} >
						<motion.div initial={{x: 100, transition: { duration: 1 },}} animate={{x:0, transition: { duration: 0 },}} exit={{x:100, transition: { duration: 0.5 },}} className="flex gap-2">
							<div className="w-1 xl:w-2 rounded-[1px] bg-gradient-to-r from-cyan-400 to-blue-500" />
							<h2 className="text-[#B1B2B5] font-adamina text-xs min-2xl:text-lg" style={{ fontFamily: "Adamina, serif" }} > van.kzr@gmail.com </h2>
						</motion.div>
					</div>					
				</div>
			
		</div>
		
		
	);
};

export default Home;
