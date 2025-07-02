import React from "react";
import { useSelector } from "react-redux";

const SectionHeader = ({ title, eyebrow, desc }) => {
  const { profile } = useSelector((state) => state.profile);
	return (
		<div>
			<div className="flex justify-center">
				<p className="font-semibold  uppercase tracking-widest bg-gradient-to-r from-emerald-300 to-sky-200 text-transparent bg-clip-text lg:text-lg">
					{eyebrow}
				</p>
			</div>
			<p className="text-gray-500 font-semibold text-md font-sans text-center mt-2">
				{profile?.IAM?.join(" | ")}
			</p>
			<h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide text-center mt-5">
				{title}
			</h2>
			<p className="md:text-lg lg:text-2xl max-w-md mx-auto text-slate-400 text-center mt-3">
				{desc}
			</p>
		</div>
	);
};

export default SectionHeader;
