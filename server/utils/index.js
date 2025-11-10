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

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});
};

export default createJWT;
export { dbConnection };
