const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		year: {
			type: Number,
			required: true,
			min: 2000,
			max: new Date().getFullYear() + 1,
		},
		image: {
			type: String,
			required: true,
		},
		visit: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/.test(
						v
					);
				},
				message: (props) => `${props.value} is not a valid URL!`,
			},
		},
		description: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Description must contain at least one line.",
      },
    },
  },   
	{
		timestamps: true,
	}
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
