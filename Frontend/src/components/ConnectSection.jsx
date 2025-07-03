import React, { useState } from "react";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import axios from "axios";

const ConnectSection = () => {
	const { user } = useSelector((state) => state.auth);
	const [connectMsg, setConnectMsg] = useState({
		name: "",
		message: "",
		mobile: "",
	});

	const handleSendMessage = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			console.log(connectMsg);
			const response = await axios.post("/v1/connect/create", connectMsg, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 201) {
				setConnectMsg({
					name: "",
					message: "",
					mobile: "",
				});
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<section className="pb-16 lg:py-24" id="project">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Connect with Me</h2>
					<p className="text-lg text-gray-600">
						I would love to hear from you! Feel free to reach out through any of
						the platforms below.
					</p>
				</div>
				<div className="max-w-2xl mx-auto p-6 rounded-lg shadow-xl bg-gray-700">
					<form onSubmit={handleSendMessage} className="space-y-3">
						<div className="mb-4 flex justify-center gap-8">
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Full Name"
								required
								value={connectMsg.name}
								onChange={(e) =>
									setConnectMsg({ ...connectMsg, name: e.target.value })
								}
								className="mt-1 block w-full px-4 py-3 bg-gray-900 rounded-md shadow-xs outline-hidden border-0 sm:text-sm text-lg placeholder:text-gray-600 font-semibold text-white focus:ring-2 focus:ring-white focus:border-white"
							/>
							<input
								type="text"
								id="mobile"
								name="mobile"
								required
								value={connectMsg.mobile}
								onChange={(e) =>
									setConnectMsg({ ...connectMsg, mobile: e.target.value })
								}
								placeholder="Mobile Number"
								className="mt-1 block w-full px-4 py-3 bg-gray-900 rounded-md shadow-xs outline-hidden border-0 sm:text-sm text-lg placeholder:text-gray-600 font-semibold text-white focus:ring-2 focus:ring-white focus:border-white hide-arrow"
							/>
						</div>
						<div className="mb-4 flex justify-center gap-8">
							<input
								type="text"
								id="username"
								name="username"
								required
								placeholder="Username"
								value={user?.details?.username || ""}
								disabled={user?.details.username ? true : false}
								className={`mt-1 block w-full px-4 py-3 bg-gray-900 rounded-md shadow-xs outline-hidden border-0 sm:text-sm text-lg placeholder:text-gray-600 font-semibold text-white focus:ring-2 focus:ring-white focus:border-white ${
									user?.details.username ? "cursor-not-allowed" : ""
								}`}
							/>
							<input
								type="email"
								id="email"
								name="email"
								required
								value={user?.details.email || ""}
								placeholder="Email Address"
								className={`mt-1 block w-full px-4 py-3 bg-gray-900 rounded-md shadow-xs outline-hidden border-0 sm:text-sm text-lg placeholder:text-gray-600 font-semibold text-white focus:ring-2 focus:ring-white focus:border-white ${
									user?.details.email ? "cursor-not-allowed" : ""
								}`}
							/>
						</div>
						<div className="mb-4 flex justify-center gap-8">
							<textarea
								name="message"
								id="message"
								placeholder="Your Message"
								value={connectMsg.message}
								onChange={(e) =>
									setConnectMsg({ ...connectMsg, message: e.target.value })
								}
								className="mt-1 block w-full px-4 py-3 bg-gray-900 rounded-md shadow-xs outline-hidden border-0 sm:text-sm text-lg placeholder:text-gray-600 font-semibold text-white focus:ring-2 focus:ring-white focus:border-white"
							></textarea>
						</div>
						<div className="flex justify-center gap-8">
							<button
								type="submit"
								className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-300"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
				<div className="mt-12 text-center">
					<p className="text-gray-600">
						Looking forward to connecting with you!
					</p>
				</div>
			</div>
		</section>
	);
};

export default ConnectSection;
