'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const projects = useMemo(() => [ 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sunt facere unde nisi reprehenderit ullam esse laudantium voluptatibus asperiores qui saepe', 
			buildwith: [ 
				{ name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' }, 
				{ name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' }, 
				{ name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' }, 
				{ name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' }, 
				{ name: 'Actix', icon: 'https://skillicons.dev/icons?i=rust' }, 
				{ name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' }, 
			], 
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sunt facere unde nisi reprehenderit ullam esse laudantium voluptatibus asperiores qui saepe', 
			buildwith: [ 
				{ name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' }, 
				{ name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' }, 
				{ name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' }, 
				{ name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' }, 
				{ name: 'Actix', icon: 'https://skillicons.dev/icons?i=rust' }, 
				{ name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' }, 
			], 
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sunt facere unde nisi reprehenderit ullam esse laudantium voluptatibus asperiores qui saepe', 
			buildwith: [ 
				{ name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' }, 
				{ name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' }, 
				{ name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' }, 
				{ name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' }, 
				{ name: 'Actix', icon: 'https://skillicons.dev/icons?i=rust' }, 
				{ name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' }, 
			], 
		}, 
		{ 
			name: 'Course-Schedule-App', 
			category: 'Web', 
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sunt facere unde nisi reprehenderit ullam esse laudantium voluptatibus asperiores qui saepe', 
			buildwith: [ 
				{ name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' }, 
				{ name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' }, 
				{ name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' }, 
				{ name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' }, 
				{ name: 'Actix', icon: 'https://skillicons.dev/icons?i=rust' }, 
				{ name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' }, 
			], 
		}, 
	], []);

	const handlePrev = () => {
		setCurrentIndex((prev) => Math.max(prev - 2, 0));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => {
		const nextIndex = prev + 2;
		return nextIndex >= projects.length ? prev : nextIndex;
		});
	};

	const visibleProjects = projects.slice(currentIndex, currentIndex + 4);

	return (
		<div className="h-full w-full px-80 flex flex-col items-center justify-center">
			<div className="flex items-center gap-3 mb-5">
				<button onClick={handlePrev} disabled={currentIndex === 0}>
				<ChevronLeft size={30} />
				</button>
				<h1 className="text-xl text-white">PROJECTS</h1>
				<button onClick={handleNext} disabled={currentIndex + 4 >= projects.length}>
				<ChevronRight size={30} />
				</button>
			</div>

			<div className="grid grid-cols-2 grid-rows-2 gap-5 px-10">
				{visibleProjects.map((project, i) => (
				<div
					key={i}
					className="h-72 w-full py-5 px-5 flex flex-col justify-center items-center gap-3 bg-[#191919] rounded-lg"
				>
					<div className="w-full flex items-center justify-between">
					<p className="text-xs lg:text-base">/{project.category}</p>
					<div className="flex items-center gap-2">
						<button className="h-4/5 text-xs lg:text-base px-3 rounded-md">
						soon
						</button>
						<img
						src="https://skillicons.dev/icons?i=github"
						alt="GitHub"
						className="h-6 w-6 md:h-8 md:w-8"
						/>
					</div>
					</div>

					<h1 className="text-center text-sm lg:text-base">{project.name}</h1>
					<p className="text-justify text-xs lg:text-sm xl:text-base overflow-hidden">
					{project.description}
					</p>

					<div className="flex flex-col gap-2 items-center">
					<h3 className="text-xs lg:text-sm xl:text-base">Built with:</h3>
					<div className="flex gap-2 flex-wrap justify-center">
						{project.buildwith.map((tech, index) => (
						<img
							key={index}
							src={tech.icon}
							alt={tech.name}
							className="h-6 w-6 md:h-8 md:w-8"
							title={tech.name}
						/>
						))}
					</div>
					</div>
				</div>
				))}
			</div>
		</div>
	);
};

export default Home;
