import { NonRetriableError } from "inngest";
import Connect from "../../models/connect.model.js";
import User from "../../models/user.model.js";
import { inngest } from "../client.js";
import { sendTicketMail } from "../../services/mailer.js";
import ticketAnalyser from "../../services/ai-agent.js";

export const onConnectCreated = inngest.createFunction(
	{ id: "on-connect", retries: 2 },
	{ event: "connect/created" },
	async ({ event, step }) => {
		try {
			const { connectionId } = event.data;

			const connection = await step.run("fetch-connection", async () => {
				const connectionObj = await Connect.findById(connectionId).populate(
					"createdBy"
				);
				if (!connectionObj) {
					throw new NonRetriableError("Connection not found");
				}
				return connectionObj;
			});

			await step.run("send-email-notification", async () => {
				if (connection) {
					const finalConnection = await Connect.findById(
						connection._id
					).populate("createdBy");
					const dataToSend = {
						name: finalConnection?.name,
						email: finalConnection?.createdBy?.email,
					};
					await sendTicketMail(
						dataToSend,
						"Recieved your message 🚀",
						`${finalConnection.message}`
					);
				}
			});

			return { success: true };
		} catch (error) {
			console.error("❌ Error running step", error.message);
			return { success: false };
		}
	}
);
