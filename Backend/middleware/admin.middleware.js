import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
	const token =
		req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Access denied. Not an admin." });
		}
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token.", error });
	}
};
