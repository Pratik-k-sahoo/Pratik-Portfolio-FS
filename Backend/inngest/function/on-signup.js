import { NonRetriableError } from "inngest";
import User from "../../models/user.model.js";
import { inngest } from "../client.js";
import { sendLoginMail } from "../../services/mailer.js";

export const onUserSignup = inngest.createFunction(
	{ id: "on-user-signup", retries: 2 },
	{ event: "user/signup" },
	async ({ event, step }) => {
		try {
			const { email } = event.data;
			const user = await step.run("get-user-email", async () => {
				const userObject = await User.findOne({ email });
				if (!userObject) {
					throw new NonRetriableError("User no longer exists in our database");
				}
				return userObject;
			});

			await step.run("send-welcome-email", async () => {
				const subject = `Welcome to the App 💐`;
				const message = `Hi, 
        \n\n
        Thanks for signing up ${user.email}. We're glad to have you onboard!😁
        `;
				await sendLoginMail(user.email, subject, message);
			});
			return { success: true };
		} catch (error) {
			console.error("❌ Error running step: ", error.message);
			return { success: false };
		}
	}
);
