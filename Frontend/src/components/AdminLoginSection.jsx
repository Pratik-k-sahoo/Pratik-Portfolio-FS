import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const AdminLoginSection = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((store) => store.auth);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Logging user:", { username, password });
		try {
			const response = await axios.post(
				"/v1/admin/login",
				{
					username,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				dispatch(login(response.data.user));
				setUsername("");
				setPassword("");
				navigate("/");
			}
		} catch (error) {
			console.error("Error during logging:", error);
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="py-32 md:py-48 lg:py-32 relative z-0 overflow-x-clip overflow-y-hidden">
			<div className="container relative">
				<h1 className="font-serif text-xl md:text-4xl lg:text-5xl font-bold text-center mt-8 lg:tracking-wider">
					Login
				</h1>
				<div className="border border-gray-500 flex justify-center w-fit mx-auto mt-6 rounded-xl">
					<form method="post" onSubmit={handleSubmit}>
						<div className="m-5 flex items-center justify-between gap-4 w-96">
							<label htmlFor="username">Username: </label>
							<input
								type="text"
								id="username"
								name="username"
								value={username}
								onChange={(e) => {
									console.log(e.target.value);
									setUsername(e.target.value);
								}}
								className="rounded-lg text-black p-2 bg-white"
							/>
						</div>

						<div className="m-5 flex gap-4 justify-between w-96">
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="rounded-lg text-black p-2 bg-white"
							/>
						</div>
						<div className="m-5 flex justify-center w-96">
							<button
								className="bg-gray-500 p-2 rounded-full px-6"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLoginSection;
