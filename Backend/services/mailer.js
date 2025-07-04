import nodemailer from "nodemailer";
import emailjs from "@emailjs/browser";
import axios from "axios";

export const sendLoginMail = async (to, subject, text) => {
	try {
		const formData = {
			email: to,
			subject,
			text,
		};
		console.log(formData);

		var data = {
			service_id: process.env.MAILER_SERVICE_ID,
			template_id: process.env.MAILER_LOGIN_TEMPLATE,
			user_id: process.env.MAILER_PUBLIC_KEY,
			template_params: formData,
			accessToken: process.env.MAILER_PRIVATE_KEY,
		};

		const response = await axios.post(
			"https://api.emailjs.com/api/v1.0/email/send",
			JSON.stringify(data),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			console.log("SUCCESS!", response.status, response.text);
		} else {
			console.log("FAILED...", err);
		}
	} catch (error) {
		console.error("❌ Mail Error: ", error.message);
		throw error;
	}
};

export const sendTicketMail = async (to, subject, text) => {
	try {
		console.log(to);
		const formData = {
			name: to?.name,
			email: to?.email,
			subject,
			message: text,
		};

		var data = {
			service_id: process.env.MAILER_SERVICE_ID,
			template_id: process.env.MAILER_NOTIFY_TEMPLATE,
			user_id: process.env.MAILER_PUBLIC_KEY,
			template_params: formData,
			accessToken: process.env.MAILER_PRIVATE_KEY,
		};

		const response = await axios.post(
			"https://api.emailjs.com/api/v1.0/email/send",
			JSON.stringify(data),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			console.log("SUCCESS!", response.status, response.text);
		} else {
			console.log("FAILED...", err);
		}
	} catch (error) {
		console.error("❌ Mail Error: ", error.message);
		throw error;
	}
};
