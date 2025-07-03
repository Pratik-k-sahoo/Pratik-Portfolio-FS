import Connect from "../models/connect.model.js";
import User from "../models/user.model.js";
import { inngest } from "../inngest/client.js";

export const createConnection = async (req, res) => {
	try {
		const { name, mobile, message } = req.body;
		console.log(name, message, mobile);
		const user = await User.findById(req.user._id);
		const connection = await Connect.create({
			name,
			mobile,
			message,
			createdBy: user._id.toString(),
		});

		await inngest.send({
			name: "connect/created",
			data: { connectionId: connection._id },
		});

		return res.status(201).json({
			message: "Connection created and processing started",
			connection,
		});
	} catch (error) {
		console.error("Error creating ticket", error.message);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
