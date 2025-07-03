import {Schema, model} from "mongoose"

const adminSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		IAM: {
			type: [String],
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: true,
			trim: true,
		},
		socialLinks: {
			gitHub: {
				type: String,
				required: true,
			},
			linkedIn: {
				type: String,
				required: true,
			},
			twitter: {
				type: String,
				required: true,
			},
			instagram: {
				type: String,
				required: true,
			},
			facebook: {
				type: String,
				required: true,
			},
			youtube: {
				type: String,
				required: true,
			},
		},
		resume: {
			type: String,
			required: true,
		},
		education: {
			tenth: {
				institution: {
					type: String,
					required: true,
				},
				year: {
					type: String,
					required: true,
				},
				percentage: {
					type: String,
					required: true,
				},
			},
			twelfth: {
				institution: {
					type: String,
					required: true,
				},
				year: {
					type: String,
					required: true,
				},
				percentage: {
					type: String,
					required: true,
				},
			},
			graduation: {
				institution: {
					type: String,
					required: true,
				},
				year: {
					type: String,
					required: true,
				},
				percentage: {
					type: String,
					required: true,
				},
			},
		},
		skills: {
			language: {
				type: [String],
			},
			tools: {
				type: [String],
			},
			tech: {
				type: [String],
			},
			database: {
				type: [String],
			},
			os: {
				type: [String],
			},
			fundamentals: {
				type: [String],
			},
			others: {
				type: [String],
			},
		},
		projects: {
			type: [Schema.Types.ObjectId],
			ref: "Project",
		},
		summary: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model("Admin", adminSchema);
