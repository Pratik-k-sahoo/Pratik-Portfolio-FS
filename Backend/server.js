import http from "http";
import app from "./index.js"
const port = process.env.PORT || 3000;
import connectDB from "./config/connectDB.js";

const server = http.createServer(app);

server.listen(port, () => {
  connectDB();
	console.log(`Server running on port ${port}`);
});
