import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import movieRoutes from "./src/routes/movieRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// API route prefix
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
