import React from "react";
import { twMerge } from "tailwind-merge";

const HeroOrbit = ({
	children,
	size,
	rotation,
	shouldOrbit = false,
	orbitDuration,
	shouldSpin = false,
	spinDuration,
}) => {
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div
				className={twMerge(shouldOrbit === true && "animate-spin")}
				style={{
					animationDuration: orbitDuration,
				}}
			>
				<div
					className={` flex items-start justify-start`}
					style={{
						height: `${size}px`,
						width: `${size}px`,
						transform: `rotate(${rotation}deg)`,
					}}
				>
					<div
						className={twMerge(shouldSpin === true && "animate-spin")}
						style={{ animationDuration: spinDuration }}
					>
						<div
							className="inline-flex animate-pulse [animation-duration: 5s]"
							style={{
								transform: `rotate(-${rotation}deg)`,
							}}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroOrbit;
