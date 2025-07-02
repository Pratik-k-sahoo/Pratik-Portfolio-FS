import React from "react";
import CheckIcon from "../assets/icons/check-circle.svg?react";
import ArrowUpRight from "../assets/icons/arrow-up-right.svg?react";

const ProjectCard = ({ project, idx }) => {
  console.log(idx);
  console.log(project);
	return (
		<div className="sticky" style={{
      top: `calc(64px + ${idx * 40}px)`
    }}>
			<div className="bg-gray-800 rounded-3xl relative z-0 after:z-10 overflow-hidden after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline-solid after:-outline-offset-2 after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 after:pointer-events-none">
				<div className="lg:grid lg:grid-cols-2 lg:gap-16">
					<div className="lg:pb-16">
						<div className="flex justify-center">
							<div className="bg-linear-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text font-bold inline-flex tracking-widest md:text-lg">
								{project.year}
							</div>
						</div>
						<h3 className="font-serif text-2xl md:text-4xl md:mt-5 mt-2 text-center">
							{project.name}
						</h3>
						<hr className="border-t-2 border-white/5 my-4 md:my-5 md:border-t-4 md:border-white/10" />
						<ul className="flex flex-col gap-3 mt-3 md:mt-5">
							{project.description.map((result) => (
								<li
									className="flex gap-2 text-sm text-white/50 md:text-lg"
									key={result}
								>
									<CheckIcon className="size-5 md:size-7 min-w-5 text-emerald-300" />
									<span>{result}</span>
								</li>
							))}
						</ul>
						<a href={project.visit}>
							<button className="bg-white text-gray-900 h-12 w-full md:w-auto md:px-10 rounded-xl font-semibold inline-flex gap-2 items-center justify-center my-8 md:text-lg md:font-bold">
								<span>Visit Site</span>
								<ArrowUpRight />
							</button>
						</a>
					</div>
					<div className="relative">
						<img
							src={project.image}
							alt={project.name}
							className="lg:absolute lg:h-full lg:w-auto lg:max-w-none lg:rounded-tl-3xl  lg:shadow-slate-950 lg:shadow-xl lg:border-l-2 lg:border-slate-900"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
