import React, { useEffect, useState } from "react";
import JobPortal from "../assets/images/JobPortal.png";
import Wastewards from "../assets/images/Wastewards.png";
import AI from "../assets/images/AI.png";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import { useSelector } from "react-redux";

const portfolioProjects = [
	{
		year: "2024",
		title: "JOB PORTAL",
		results: [
			{
				title: "Upload Jobs as recruiter.",
			},
			{
				title:
					"Applicant can apply for any job and sort the job based on his/her interest.",
			},
			{
				title: "Applicant and Recruiter can keep track of his/her jobs.",
			},
		],
		link: "https://job-portal-5hov.onrender.com/",
		image: JobPortal,
	},
	{
		year: "2024",
		title: "WASTEWARDS",
		results: [
			{
				title:
					"Shows client's actual location on map by there service dashboard to the worker.",
			},
			{
				title:
					"Incentivize responsible waste disposal and promote environmental.",
			},
			{
				title: "Community engagement and streak tracking.",
			},
		],
		link: "https://wastewards.vercel.app/",
		image: Wastewards,
	},
	{
		year: "2024",
		title: "SHORT VID GEN",
		results: [
			{
				title:
					"An advanced AI short video generator according to user's input.",
			},
			{
				title: "Story, character and duration based video generator.",
			},
		],
		link: "https://ai-short-video-generator.onrender.com/dashboard",
		image: AI,
	},
];

const Projects = () => {
	const { profile } = useSelector((state) => state.profile);
	const { project } = useSelector((state) => state.project);

	const [activeProject, setActiveProject] = useState(null);

	useEffect(() => {
		if (project) {
			const filteredProject = project.filter((item) =>
				profile?.projects?.includes(item._id)
			);
			setActiveProject(filteredProject);
		}
	}, [project, profile?.projects]);

	return (
		<section className="pb-16 lg:py-24 pt-20 md:pt-24 sm:pt-40" id="project">
			<div className="container">
				<SectionHeader
					eyebrow={"Real-World Results"}
					title={"Featured Projects"}
					desc={"Transformed concepts into engaging digital experiences."}
				/>

				<div className="flex flex-col mt-10 md:mt-20 gap-20">
					{activeProject?.map((project, idx) => (
						<ProjectCard
							project={project}
							idx={idx}
							key={project._id}
							className=""
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
