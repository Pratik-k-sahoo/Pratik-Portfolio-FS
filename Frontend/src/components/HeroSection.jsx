import React from "react";
import memojiImage from "../assets/images/memoji-computer.png";
import ArrowDown from "../assets/icons/arrow-down.svg?react";
import plateEffect from "../assets/images/plate-effect.jpeg";
import HeroOrbit from "./HeroOrbit";
import StarIcon from "../assets/icons/star.svg?react";
import SparkleIcon from "../assets/icons/sparkle.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
	const { profile } = useSelector((state) => state.profile);
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	return (
		<div className="py-32 sm:pt-40 md:py-48 lg:py-32 relative z-0 overflow-x-clip overflow-y-hidden">
			<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_50%,transparent)]">
				<div
					className="absolute sm:block md:hidden inset-0 h-full"
					style={{
						backgroundImage: `url(${plateEffect})`,
						backgroundSize: "cover",
					}}
				></div>
			</div>
			<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
				<div className="size-[420px] hero-ring"></div>
				<div className="size-[620px] hero-ring"></div>
				<div className="size-[820px] hero-ring"></div>
				<div className="size-[1020px] hero-ring"></div>
				<div className="size-[1220px] hero-ring"></div>
				<div className="size-[1420px] hero-ring"></div>
				<HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="20s">
					<SparkleIcon className="size-8 text-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit
					size={440}
					rotation={79}
					shouldOrbit
					orbitDuration="22s"
					shouldSpin
					spinDuration="3s"
				>
					<SparkleIcon className="size-5 text-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="24s">
					<div className="size-2 rounded-full bg-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit
					size={530}
					rotation={178}
					shouldOrbit
					orbitDuration="26s"
					shouldSpin
					spinDuration="3s"
				>
					<SparkleIcon className="size-10 text-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit
					size={550}
					rotation={20}
					shouldOrbit
					orbitDuration="30s"
					shouldSpin
					spinDuration="6s"
				>
					<StarIcon className="size-12 text-emerald-300" />
				</HeroOrbit>
				<HeroOrbit
					size={590}
					rotation={98}
					shouldOrbit
					orbitDuration="32s"
					shouldSpin
					spinDuration="6s"
				>
					<StarIcon className="size-8 text-emerald-300" />
				</HeroOrbit>
				<HeroOrbit size={650} rotation={-10} shouldOrbit orbitDuration="34s">
					<div className="size-2 rounded-full bg-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit
					size={710}
					rotation={144}
					shouldOrbit
					orbitDuration="36s"
					shouldSpin
					spinDuration="3s"
				>
					<SparkleIcon className="size-14 text-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="38s">
					<div className="size-3 rounded-full bg-emerald-300/25" />
				</HeroOrbit>
				<HeroOrbit
					size={800}
					rotation={-72}
					shouldOrbit
					orbitDuration="40s"
					shouldSpin
					spinDuration="6s"
				>
					<StarIcon className="size-28 text-emerald-300" />
				</HeroOrbit>
			</div>
			<div className="container relative">
				<div className="flex flex-col items-center">
					<img
						className="size-[100px] md:size-[150px] lg:size-[200px]"
						src={memojiImage}
						alt="Person peeking behind laptop"
					/>
					<div className="bg-gray-950 border border-gray-800 px-4 py-1.5 rounded-2xl inline-flex items-center justify-between gap-2 drop-shadow-lg">
						<div className="border border-green-500 rounded-full size-2.5 bg-green-500 relative">
							<div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full"></div>
						</div>
						<div className="text-sm md:text-md lg:text-xl font-medium">
							Available For New Project
						</div>
					</div>
				</div>
				<h1 className="font-serif text-xl md:text-4xl lg:text-5xl font-bold text-center mt-8 lg:tracking-wider">
					{profile?.genre}
				</h1>
				<p className="text-center text-sm text-white/60 mt-4 md:px-18 lg:px-14 px-6 md:text-xl lg:text-3xl">
					{profile?.summary}
				</p>
				<div className="flex flex-col items-center mt-8 md:flex-row gap-4 justify-center">
					<button
						className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-green-500 text-white"
						onClick={() => {
							if (user) {
								const link = document.createElement("a");
								link.href = profile?.resume;
								link.download = "resume.pdf";
								link.click();
							} else {
								navigate("/login");
							}
						}}
					>
						<span className="font-semibold">Download Resume</span>
					</button>
					<Link
						to={"/project"}
						className="inline-flex items-center border border-white/15 gap-2 px-6 h-12 rounded-xl"
					>
						<span className="font-semibold">Explore my works</span>
						<ArrowDown className="size-4" />
					</Link>
					<button className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-green-500 text-white">
						<span className="text-2xl animate-wave">👏</span>
						<span className="font-semibold">Let's Connect</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
