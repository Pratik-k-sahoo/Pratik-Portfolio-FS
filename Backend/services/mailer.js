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
			service_id: "service_dy3rje4",
			template_id: "template_jtipxof",
			user_id: "RsegK776g1Xct5GMM",
			template_params: formData,
			accessToken: "C4Ef5YJEjJ8513x1wFiCz",
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
			service_id: "service_dy3rje4",
			template_id: "template_arvsh5q",
			user_id: "RsegK776g1Xct5GMM",
			template_params: formData,
			accessToken: "C4Ef5YJEjJ8513x1wFiCz",
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
