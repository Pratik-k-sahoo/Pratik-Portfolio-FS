const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
	createProject,
	getProjects,
} = require("../controller/project.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const {
	addDetails,
	getProfile,
	updateProfile,
} = require("../controller/admin.controller");
const multer = require("multer");
const { uploadImageToCloud } = require("../services/image.service");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username and password are required" });
		}
		if (
			username !== process.env.ADMIN_USERNAME &&
			password !== process.env.ADMIN_PASSWORD
		) {
			return res.status(401).json({ message: "Invalid username or password" });
		}
		const token = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		if (!token) {
			return res.status(500).json({ message: "Token generation failed" });
		}
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		return res.status(200).json({
			message: "Login successful",
			user: {
				role: "admin",
				username,
			},
			token,
		});
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/logout", (req, res) => {
	try {
		// Invalidate the token by not returning it or by using a blacklist in a real application
		return res.status(200).json({ message: "Logout successful" });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/create-project", isAdmin, async (req, res) => {
	try {
		const { name, description, year, image, visit } = req.body;
		if (!name || !description || !year || !image || !visit) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const newProject = await createProject(
			name,
			description,
			year,
			image,
			visit
		);
		return res
			.status(201)
			.json({ message: "Project created successfully", project: newProject });
	} catch (error) {
		console.error("Error creating project:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/add-data", isAdmin, async (req, res) => {
	try {
		const {
			name,
			IAM,
			image,
			genre,
			about,
			socialLinks,
			resume,
			education,
			skills,
		} = req.body;
		const adminDetails = await addDetails(
			name,
			IAM,
			image,
			genre,
			about,
			socialLinks,
			resume,
			education,
			skills
		);

		return res
			.status(201)
			.json({ message: "Data added successfully", admin: adminDetails });
	} catch (err) {
		console.error("Error adding data:", err);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/profile", async (req, res) => {
	try {
		const profile = await getProfile();
		if (!profile) {
			return res.status(404).json({ message: "Profile not found" });
		}
		return res
			.status(200)
			.json({ message: "Profile retrieved successfully", profile });
	} catch (error) {
		console.error("Error retrieving profile:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/get-projects", async (req, res) => {
	try {
		const projects = await getProjects();
		if (!projects || projects.length === 0) {
			return res.status(404).json({ message: "No projects found" });
		}
		return res
			.status(200)
			.json({ message: "Projects retrieved successfully", projects });
	} catch (error) {
		console.error("Error retrieving projects:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post(
	"/update-profile",
	isAdmin,
	upload.fields([{ name: "image" }, { name: "resume" }]),
	async (req, res) => {
		try {
			const image = req.files["image"] ? req.files["image"][0] : null;
			const resume = req.files["resume"] ? req.files["resume"][0] : null;
			const result = await updateProfile(req.body, image, resume);
			if (!result) {
				return res.status(400).json({ message: "Profile update failed" });
			}
			return res
				.status(200)
				.json({ message: "Profile updated successfully", profile: result });
		} catch (error) {
			console.error("Error updating profile:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

module.exports = router;
