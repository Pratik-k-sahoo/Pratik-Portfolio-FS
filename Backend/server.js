const http = require("http");
const app = require("./index");
const port = process.env.PORT || 3000;
const connectDB = require("./config/connectDB");

const server = http.createServer(app);

server.listen(port, () => {
  connectDB();
	console.log(`Server running on port ${port}`);
});
