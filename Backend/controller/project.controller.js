import Admin from "../models/admin.model.js";
import Project from "../models/project.model.js";
import { uploadImageToCloud } from "../services/image.service.js";

export const createProject = async (name, description, year, image, visit) => {
	try {
		if (!name || !description || !year || !image || !visit) {
			throw new Error("All fields are required");
		}
		const imageURL = await uploadImageToCloud(image);
		if (!imageURL) {
			throw new Error("Image upload failed");
		}
		const newProject = new Project({
			name,
			year,
			image: imageURL,
			visit,
			description: Array.isArray(description)
				? description
				: description.split("|"),
		});
		await newProject.save();
		const admin = await Admin.findOne({ name: "PRATIK SAHOO" });
		let projectArr = admin.projects;
		projectArr.push(newProject._id);
		admin.updateOne({
			projects: projectArr,
		});
		await admin.save();
		return newProject;
	} catch (error) {
		console.error("Error creating project:", error);
		throw error;
	}
};

export const getProjects = async () => {
	try {
		const projects = await Project.find().sort({ year: -1 });
		if (!projects || projects.length === 0) {
			throw new Error("No projects found");
		}
		return projects;
	} catch (error) {
		console.error("Error retrieving projects:", error);
		throw error;
	}
};
