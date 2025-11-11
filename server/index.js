import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./utils/index.js";
import { routeNotFound, errorHandler } from "./middleware/errorMiddlewares.js";
import router from "./routes/index.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://localhost:3001",
			"http://localhost:5173",
		],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Basic API router (placeholder to avoid middleware errors)

app.use("/api", router);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is lisening on ${PORT}`));
