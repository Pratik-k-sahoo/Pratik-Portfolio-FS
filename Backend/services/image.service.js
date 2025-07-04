import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

export const uploadImageToCloud = async (image, originalName = "") => {
	try {
		if (!image) {
			throw new Error("Image is required");
		}
		// const result = await cloudinary.uploader.upload(image, {
		//   use_filename: true,
		//   unique_filename: false,
		//   overwrite: true,
		// });
		// return result.secure_url;
		return new Promise(async (resolve, reject) => {
			const uniqueFileName = `${uuidv4()}-${originalName}`;
			const stream = await cloudinary.uploader.upload_stream(
				{
					public_id: uniqueFileName,
					use_filename: true,
					unique_filename: false,
					overwrite: false,
				},
				(error, result) => {
					if (error) {
						return reject(error);
					}
					resolve(result.secure_url);
				}
			);
			stream.end(image);
		});
	} catch (error) {
		console.error("Error uploading image to cloud:", error);
		throw error;
	}
};
