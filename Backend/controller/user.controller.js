import User from "../models/user.model.js";
import { inngest } from "../inngest/client.js";

export const createUser = async (username, email, password) => {
	const newUser = new User({ username, email, password });
	await newUser.save();

	await inngest.send({
		name: "user/signup",
		data: { email },
	});

	return newUser;
};

export const getUserByUsername = async (username) => {
	return await User.findOne({ username });
};

export const loginUser = async (username, password) => {
	const user = await getUserByUsername(username);
	if (user) {
		const isMatch = await user.comparePassword(password);
		if (isMatch) {
			const token = user.generateAuthToken();
			return { user, token };
		} else {
			throw new Error("Authentication failed, incorrect password");
		}
	} else {
		throw new Error("User not found");
	}
};

export const getUsers = async (req, res) => {
	try {
		if (!(req.user.role !== "user")) {
			return res.status(403).json({ error: "Forbidden" });
		}

		const users = await User.find().select("-password");
		return res.json({ users });
	} catch (error) {
		res
			.status(500)
			.json({ error: "User fetching failed", details: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { skills = [], role, email } = req.body;
	try {
		if (req.user?.role !== "admin") {
			return res.status(403).json({ error: "Forbidden" });
		}

		let user = await User.findOne({ email });
		if (!user) return res.status(401).json({ error: "User not found." });

		user = await User.findOneAndUpdate(
			{ email },
			{ skills: skills.length ? skills : user.skills, role },
			{ new: true }
		);
		res.json({ message: "User updated successfully.", user });
	} catch (error) {
		res
			.status(500)
			.json({ error: "User update failed", details: error.message });
	}
};
