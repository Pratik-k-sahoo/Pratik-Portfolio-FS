import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	status: {
		type: String,
		default: "TODO",
		enum: ["TODO", "IN_PROGRESS", "RESOLVED"],
	},
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
	},
	deadline: Date,
	helpfulNotes: String,
	relatedSkills: [String],
	createdAt: { type: Date, default: Date.now },
});

export default model("Ticket", ticketSchema);
