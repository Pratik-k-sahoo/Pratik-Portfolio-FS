import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import adminRoutes from "./routes/admin.routes.js"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
	res.send("Hello World");
});

export default app;