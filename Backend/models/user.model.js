import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: function (v) {
					return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
				},
			},
			message: (props) => `${props.value} is not a valid email!`,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 100,
		},
	},
	{
		timestamps: true,
	}
);
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ id: this._id, username: this.username },
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
	return token;
};

export default model("User", userSchema);
