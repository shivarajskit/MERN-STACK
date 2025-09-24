import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cookieParser()); // enables use of cookies from the request. Eg. req.cookies.refreshToken

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend to-do app port
    credentials: true               // allow cookies/authorization headers
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
