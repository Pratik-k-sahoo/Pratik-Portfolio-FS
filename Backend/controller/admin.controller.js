import Admin from "../models/admin.model.js";
import { uploadImageToCloud } from "../services/image.service.js";

export const addDetails = async (
	name,
	IAM,
	image,
	genre,
	about,
	socialLinks,
	resume,
	education,
	skills
) => {
	try {
		const imageURL = await uploadImageToCloud(image);
		if (!imageURL) {
			throw new Error("Image upload failed");
		}
		const resumeURL = await uploadImageToCloud(resume);
		if (!resumeURL) {
			throw new Error("Resume upload failed");
		}
		const skillsObject = {
			language: skills.language.split("|").map((item) => item.trim()),
			tools: skills.tools.split("|").map((item) => item.trim()),
			tech: skills.tech.split("|").map((item) => item.trim()),
			database: skills.database.split("|").map((item) => item.trim()),
			os: skills.os.split("|").map((item) => item.trim()),
			fundamentals: skills.fundamentals.split("|").map((item) => item.trim()),
			others: skills.others.split("|").map((item) => item.trim()),
		};
		const newAdmin = new Admin({
			name,
			IAM: IAM.split("|").map((item) => item.trim()),
			image: imageURL,
			genre,
			about,
			socialLinks,
			resume: resumeURL,
			education,
			skills: skillsObject,
		});
		await newAdmin.save();
		return newAdmin;
	} catch (err) {
		console.error("Error adding admin details:", err);
		throw new Error("Failed to add admin details: " + err);
	}
};

export const getProfile = async () => {
	try {
		const profile = await Admin.findOne();
		if (!profile) {
			throw new Error("Profile not found");
		}
		return profile;
	} catch (error) {
		console.error("Error retrieving profile:", error);
		throw new Error("Failed to retrieve profile: " + error);
	}
};

export const updateProfile = async (profileData, image, resume) => {
	try {
		const profile = await getProfile();
		const updateData = {
      ...profile.toObject(),
			...profileData,
		};
    console.log("Update Data: ", updateData);
		if (image) {
			const imageURL = await uploadImageToCloud(
				image.buffer,
				image.originalName
			);
			if (!imageURL) {
				throw new Error("Image upload failed");
			}
			updateData.image = imageURL;
		}
		if (resume) {
			const resumeURL = await uploadImageToCloud(
				resume.buffer,
				resume.originalName
			);
			if (!resumeURL) {
				throw new Error("Resume upload failed");
			}
			updateData.resume = resumeURL;
		}
		const updatedProfile = await Admin.findOneAndUpdate({}, updateData, {
			new: true,
		});
		return updatedProfile;
	} catch (error) {
		console.error("Error updating profile:", error);
		throw new Error("Failed to update profile: " + error);
	}
};


