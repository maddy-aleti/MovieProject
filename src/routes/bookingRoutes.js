import express from "express";
import bookTicket from "../controllers/bookingController/bookTicket.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User books tickets
router.post("/", protect, bookTicket);

export default router;
