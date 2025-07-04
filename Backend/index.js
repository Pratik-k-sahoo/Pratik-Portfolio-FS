import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { serve } from "inngest/express";
const app = express();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import connectionRoutes from "./routes/connect.routes.js";
import { onUserSignup } from "./inngest/function/on-signup.js";
import { onTicketCreated } from "./inngest/function/on-ticket-create.js";
import { onConnectCreated } from "./inngest/function/on-connect.js";
import { inngest } from "./inngest/client.js";
import connectDB from "./config/connectDB.js";

const PORT = process.env.PORT || 3000;
const corsOptions = {
	origin: "https://portfolio.sipun.online/",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/connect", connectionRoutes);

app.use(
	"/api/inngest",
	serve({
		client: inngest,
		functions: [onUserSignup, onTicketCreated, onConnectCreated],
	})
);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	connectDB();
	console.log(" 🚀 Server at http://localhost:3000 ");
});
