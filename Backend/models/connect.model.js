import { Schema, model } from "mongoose";

const connectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default model("Connect", connectSchema);
