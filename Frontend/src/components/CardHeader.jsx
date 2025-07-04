import React from 'react'
import Star from "../assets/icons/star.svg?react";
import { twMerge } from 'tailwind-merge';

const CardHeader = ({title, desc, className}) => {
  return (
		<div className={twMerge("flex flex-col gap-3 p-6 md:py-8 md:px-10", className)}>
			<div className="inline-flex items-center gap-2">
				<Star className="size-9 text-emerald-300" />
				<h3 className="font-serif text-3xl">{title}</h3>
			</div>
			<p className="text-sm lg:text-base max-w-xs text-white/60">{desc}</p>
		</div>
	);
}

export default CardHeader