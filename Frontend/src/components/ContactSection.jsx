import React from "react";
import ArrowUpRightIcon from "../assets/icons/arrow-up-right.svg?react";
import { Link } from "react-router-dom";

const ContactSection = () => {
	return (
		<div
			className="py-16 pt-20 lg:py-24 lg:pt-20 sm:pt-40 md:pt-32"
			id="contact-me"
		>
			<div className="container grid gap-8">
				<div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left">
					<div className="flex flex-col gap-8 md:gap-16 md:flex-row items-center">
						<div>
							<h2 className="font-serif text-2xl md:text-3xl">
								Let's create something amazing together
							</h2>
							<p className="text-sm md:text-base mt-2">
								Ready to bring your next project to live? Let's connect and
								discuss how I can help you achieve your goals.
							</p>
						</div>
						<div>
							<Link
								to={"/connect-me"}
								className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max"
							>
								<span className="font-semibold">Contact Me</span>
								<ArrowUpRightIcon className="size-4" />
							</Link>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left">
					<div className="flex flex-col gap-8 md:gap-16 md:flex-row items-center">
						<div>
							<h2 className="font-serif text-2xl md:text-3xl">
								Do you have any <strong>unsolved issue?</strong>
							</h2>
							<p className="text-sm md:text-base mt-2">
                Ready to solve the issue? Raise your ticket and I with my team can guide and help you to get <strong>ride of your issues</strong>. Let's together <strong className="text-lg text-red-600">Debug The Bug</strong>.
							</p>
						</div>
						<div>
							<Link
								to={"/raise-ticket"}
								className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max"
							>
								<span className="font-semibold">Raise Ticket</span>
								<ArrowUpRightIcon className="size-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;
