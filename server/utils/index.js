import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Database connected successfully");
	} catch (error) {
		console.log("Db error :" + error);
	}
};

const createJWT = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});

	// Default to development settings if NODE_ENV is not explicitly set to "production"
	const isProduction = process.env.NODE_ENV === "production";
	
	res.cookie("token", token, {
		httpOnly: true,
		secure: isProduction, // false in development, true in production
		sameSite: isProduction ? "none" : "lax", // "lax" for localhost, "none" for cross-origin in production
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return token; // Return token so it can be included in response body for API clients
};

export default createJWT;
export { dbConnection };
