import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Card from "./Card";
import Javascript from "../assets/icons/square-js.svg?react";
import Html from "../assets/icons/html5.svg?react";
import Css from "../assets/icons/css3.svg?react";
import ReactIcon from "../assets/icons/react.svg?react";
import Chrome from "../assets/icons/chrome.svg?react";
import Github from "../assets/icons/github.svg?react";
import bookImage from "../assets/images/book-cover.png";
import { motion } from "framer-motion";

import mapImage from "../assets/images/map.png";
import smileEmoji from "../assets/images/memoji-smile.png";
import CardHeader from "./CardHeader";
import ToolboxItem from "./ToolboxItem";
import { useRef } from "react";
import { useSelector } from "react-redux";
import SectionSubHeader from "./SectionSubHeader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Tape from "./Tape";

const hobbies = [
	{
		title: "Painting",
		emoji: "🎨",
		left: "5%",
		top: "5%",
	},
	{
		title: "Gaming",
		emoji: "🎮",
		left: "50%",
		top: "5%",
	},
	{
		title: "Music",
		emoji: "🎵",
		left: "10%",
		top: "35%",
	},
	{
		title: "Fitness",
		emoji: "🏋️",
		left: "35%",
		top: "40%",
	},
	{
		title: "Cooking",
		emoji: "🍳",
		left: "70%",
		top: "45%",
	},
	{
		title: "Football",
		emoji: "⚽",
		left: "5%",
		top: "65%",
	},
];

const AboutSection = () => {
	gsap.registerPlugin(useGSAP);
	const { profile } = useSelector((state) => state.profile);
	const constrainRef = useRef(null);
	const containerRef = useRef(null);
	const languageRef = useRef(null);
	const [expand, setExpand] = useState(false);
	const handleExpand = () => {
		setExpand((prev) => !prev);
	};

	useGSAP(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
		);
	});

	return (
		<div className="py-20 lg:py-28">
			<Tape />
			<div className="container">
				<SectionHeader
					eyebrow="About Me"
					title="A Glimpse Into My World"
					desc="Learn more about who I am, what I do and what inspires me."
				/>
				<div className="mt-20 overflow-hidden">
					<pre
						className="font-semibold  uppercase tracking-widest bg-linear-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text lg:text-lg text-center text-wrap"
						ref={containerRef}
					>
						{expand ? profile?.about : profile?.about?.split("\n")[0] + "..."}

						<span
							className="text-emerald-300 cursor-pointer ml-2"
							onClick={handleExpand}
						>
							{expand ? "Show Less" : "Show More"}
						</span>
					</pre>
				</div>
				<div className="mt-20 flex flex-col gap-8">
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
						<Card className="pb-4 md:col-span-5 lg:col-span-5">
							<CardHeader title="Education" />
							<div className="mt-2 md:mt-0 mx-10 w-auto p-3 flex justify-between items-center">
								<div>
									<h2 className="font-bold underline text-xl font-sans">
										10th/Secondary Education Examination
									</h2>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Institution:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.tenth?.institution}
										</span>
									</p>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Year:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.tenth?.year}
										</span>
									</p>
								</div>
								<div>
									<p>{profile?.education?.tenth?.percentage}</p>
								</div>
							</div>
							<div className="mt-2 md:mt-0 mx-10 w-auto p-3 flex justify-between items-center">
								<div>
									<h2 className="font-bold underline text-xl font-sans">
										12th/Higher Secondary Education Examination
									</h2>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Institution:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.twelfth?.institution}
										</span>
									</p>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Year:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.twelfth?.year}
										</span>
									</p>
								</div>
								<div>
									<p>{profile?.education?.twelfth?.percentage}</p>
								</div>
							</div>
							<div className="mt-2 md:mt-0 mx-10 w-auto p-3 flex justify-between items-center">
								<div>
									<h2 className="font-bold underline text-xl font-sans">
										B. Tech in Computer Science Engineering
									</h2>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Institution:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.graduation?.institution}
										</span>
									</p>
									<p className="text-gray-500 font-semibold text-md font-sans">
										Year:{" "}
										<span className="text-gray-200 font-medium text-md font-sans">
											{profile?.education?.graduation?.year} till 5th Semester
										</span>
									</p>
								</div>
								<div>
									<p>{profile?.education?.graduation?.percentage}</p>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<div className="mt-20 flex flex-col gap-8">
					<SectionSubHeader
						title={"SKILLS"}
						desc={"Explore the skills that define my professional journey."}
					/>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
						<Card className="h-[320px] md:col-span-2 lg:col-span-1">
							<CardHeader
								title="Language"
								desc="Explore the programming languages I use "
							/>
							<div
								className="relative flex px-4 gap-2 flex-wrap"
								ref={languageRef}
							>
								{profile?.skills?.language?.map((lang, idx) => (
									<motion.div
										key={idx}
										className="inline-flex items-center gap-2 px-6 bg-linear-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 cursor-pointer"
										drag
										dragConstraints={languageRef}
									>
										<span className="font-medium text-gray-950">{lang}</span>
									</motion.div>
								))}
							</div>
						</Card>
						<Card className="h-[320px] md:col-span-3 lg:col-span-2">
							<CardHeader
								title="My Tech"
								desc="Explore the technologies I use to craft exceptional
								digital experiences."
							/>
							<ToolboxItem
								items={profile?.skills?.tech}
								className=""
								itemsWrapperClassName="animate-move-left [animation-duration:30s]"
							/>
							<ToolboxItem
								items={profile?.skills?.tech}
								className="mt-6"
								itemsWrapperClassName="animate-move-right [animation-duration:15s]"
							/>
						</Card>
					</div>
					<div className="grid gap-8 ">
						<Card className="h-[320px] ">
							<CardHeader
								title="CS Fundamentals and Others"
								desc="Explore my understanding of computer science fundamentals and other skills."
							/>
							<div className="flex flex-wrap gap-2 p-4">
								{profile?.skills?.fundamentals
									?.concat(profile?.skills?.others)
									?.map((item, idx) => (
										<div
											className="p-1 px-3 border border-white/15 bg-white/10 backdrop-blur-sm rounded-full w-fit cursor-pointer hover:bg-white/20 transition-colors duration-200"
											key={idx}
											onClick={() => {
												const link = `https://www.google.com/search?q=${encodeURIComponent(
													item
												)}`;
												window.open(link, "_blank");
											}}
										>
											{item}
										</div>
									))}
							</div>
						</Card>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
						<Card className="h-[320px] relative md:col-span-2 lg:col-span-1">
							<CardHeader
								title="Databases"
								desc="Explore the databases I work with."
								className="px-6 py-6"
							/>
							<div className="flex flex-wrap gap-2 p-4 px-10">
								{profile?.skills?.database?.map((item, idx) => (
									<div
										className="p-1 px-3 border border-white/15 bg-white/10 backdrop-blur-sm rounded-full w-fit cursor-pointer"
										key={idx}
										onClick={() => {
											const link = `https://www.google.com/search?q=${encodeURIComponent(
												item
											)}`;
											window.open(link, "_blank");
										}}
									>
										{item}
									</div>
								))}
							</div>
						</Card>
						<Card className="h-[320px] flex flex-col md:col-span-3 lg:col-span-2">
							<CardHeader
								title="Tools & Platforms"
								desc="Explore the tools, and platforms I work with."
								className="px-6 py-6"
							/>
							<ul className="px-12 grid grid-cols-3 gap-y-4">
								{profile?.skills?.os
									?.concat(profile?.skills?.tools)
									.map((item, idx) => (
										<li
											className="list-decimal text-gray-500 mx-6 cursor-pointer"
											key={idx}
											onClick={() => {
												const link = `https://www.google.com/search?q=${encodeURIComponent(
													item
												)}`;
												window.open(link, "_blank");
											}}
										>
											<p className="text-lg font-bold text-gray-200 hover:text-emerald-300">
												{item}
											</p>
										</li>
									))}
							</ul>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
						<Card className="h-[320px] flex flex-col md:col-span-3 lg:col-span-2">
							<CardHeader
								title="Beyond The Code"
								desc="Explore my interest and hobbies beyond the digital realm."
								className="px-6 py-6"
							/>
							<div className="relative flex-1" ref={constrainRef}>
								{hobbies.map((hobby, idx) => (
									<motion.div
										key={idx}
										className="inline-flex items-center gap-2 px-6 bg-linear-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute cursor-pointer"
										style={{
											left: hobby.left,
											top: hobby.top,
										}}
										drag
										dragConstraints={constrainRef}
									>
										<span className="font-medium text-gray-950">
											{hobby.title}
										</span>
										<span>{hobby.emoji}</span>
									</motion.div>
								))}
							</div>
						</Card>
						<Card className="h-[320px] relative md:col-span-2 lg:col-span-1">
							<img
								src={mapImage}
								alt="map"
								className="h-full w-full object-cover object-top-left"
							/>
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline-solid after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
								<div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
								<div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-300 to-sky-400 -z-10"></div>
								<img src={smileEmoji} alt="Smiling Emoji" className="size-20" />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
