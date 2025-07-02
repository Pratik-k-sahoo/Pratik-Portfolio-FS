import React from "react";
import { useSelector } from "react-redux";

const SectionSubHeader = ({ title, desc }) => {
	const { profile } = useSelector((state) => state.profile);
	return (
		<div>
			<h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide text-center mt-5">
				{title}
			</h2>
			<p className="md:text-lg lg:text-2xl max-w-md mx-auto text-slate-400 text-center mt-3">
				{desc}
			</p>
		</div>
	);
};

export default SectionSubHeader;
