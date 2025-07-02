import emailjs from "@emailjs/browser";

const templateParams = {
	name: "James",
	notes: "Check this out!",
};

emailjs
	.send("service_dy3rje4", "template_arvsh5q", templateParams, {
		publicKey: "YOUR_PUBLIC_KEY",
	})
	.then(
		(response) => {
			console.log("SUCCESS!", response.status, response.text);
		},
		(err) => {
			console.log("FAILED...", err);
		}
	);
