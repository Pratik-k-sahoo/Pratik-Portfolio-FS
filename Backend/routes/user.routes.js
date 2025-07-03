import express from "express";
const router = express.Router();
import { createUser, loginUser } from "../controller/user.controller.js";

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	console.log(username, email, password);
	try {
		const newUser = await createUser(username, email, password);
		const token = newUser.generateAuthToken();
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		res.status(201).json({
			message: "User registered successfully",
			user: {
				details: newUser._doc,
				role: "user",
			},
			token,
		});
	} catch (err) {
		res
			.status(400)
			.json({ error: "Error registering user", details: err.message });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const { user, token } = await loginUser(username, password);
		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		if (!token) {
			return res.status(500).json({ message: "Token generation failed" });
		}
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		res.status(200).json({
			message: "Login successful",
			user: {
				details: user,
				role: "user",
			},
			token,
		});
	} catch (err) {
		res
			.status(400)
			.json({ error: "Error logging in user", details: err.message });
	}
});

router.get("/logout", (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	res.status(200).json({ message: "Logout successful" });
});

export default router;
