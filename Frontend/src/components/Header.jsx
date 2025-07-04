import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = ({ page }) => {
  const { profile } = useSelector((state) => state.profile);
	const [active, setActive] = useState(page);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await axios.get("/v1/user/logout", {
				withCredentials: true,
			});
			if (response.status === 200) {
				dispatch(logout());
				navigate("/");
			}
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<div className="w-full flex justify-center items-center fixed top-3 sm:flex-col md:flex-row lg:flex-row gap-1 z-50">
			<Link
				to={"/"}
				className="sm:text-xl md:text-2xl lg:text-3xl flex-start font-bold text-white cursor-pointer p-2 backdrop-blur-sm hover:text-white/80 transition duration-150 md:absolute rounded-full lg:left-12 md:left-3"
			>
				{profile?.name}
			</Link>
			<nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center">
				<Link
					className={`${active === "home" ? "nav-item-active" : "nav-item"}`}
					to="/"
					onClick={() => setActive("home")}
				>
					Home
				</Link>
				<Link
					className={`${active === "project" ? "nav-item-active" : "nav-item"}`}
					to="/project"
					onClick={() => setActive("project")}
				>
					Projects
				</Link>
				<Link
					className={`${active === "about" ? "nav-item-active" : "nav-item"}`}
					to="/about-me"
					onClick={() => setActive("about")}
				>
					About
				</Link>
				<Link
					className={`${
						active === "contact-me" ? "nav-item-active" : "nav-item"
					}`}
					to="/contact-me"
					onClick={() => setActive("contact-me")}
				>
					Contact Me
				</Link>
			</nav>
			{!user && (
				<nav className="flex gap-1 p-0.5 border border-white/15 bg-white/10 backdrop-blur-sm items-center justify-center md:absolute rounded-full lg:right-12 md:right-3">
					<Link
						className={`${
							active === "register" ? "nav-item-active" : "nav-item"
						}`}
						to="/register"
						onClick={() => setActive("register")}
					>
						Register
					</Link>
					<Link
						className={`${active === "login" ? "nav-item-active" : "nav-item"}`}
						to="/login"
						onClick={() => setActive("login")}
					>
						Login
					</Link>
				</nav>
			)}
			{user && (
				<nav className="flex gap-1 p-0.5 border border-white/15 bg-white/10 backdrop-blur-sm items-center justify-center md:absolute rounded-full lg:right-12 md:right-3">
					<Link
						className={`${active === "login" ? "nav-item-active" : "nav-item"}`}
						onClick={handleLogout}
					>
						Logout
					</Link>
				</nav>
			)}
		</div>
	);
};

export default Header;


