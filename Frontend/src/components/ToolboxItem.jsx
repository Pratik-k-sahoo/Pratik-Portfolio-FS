import React from "react";
import TechIcon from "./TechIcon";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";

const ToolboxItem = ({ items, className, itemsWrapperClassName }) => {
	return (
		<div
			className={twMerge(
				"flex mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
				className
			)}
		>
			<div
				className={twMerge(
					"flex py-0.5 flex-none gap-4 pr-6",
					itemsWrapperClassName
				)}
			>
				{[...new Array(2)].fill(0).map((_, idx) => (
					<Fragment key={idx}>
						{items.map((items, idx) => (
							<div
								key={idx}
								className="inline-flex items-center gap-7 py-2 px-3 outline-solid outline-2 outline-white/10 rounded-lg"
							>
								{/* <TechIcon component={items.iconType} /> */}
								<span className="font-semibold">{items}</span>
							</div>
						))}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default ToolboxItem;
