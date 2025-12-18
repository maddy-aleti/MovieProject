import express from "express";
import { registerUser } from "../controllers/authController/registerController.js";
import { loginUser } from "../controllers/authController/loginController.js";
import verifyEmail from "../controllers/authController/verifyEmailController.js";

const router= express.Router();

//Register a new user
router.post("/register", registerUser);

//Login an existing user
router.post("/login", loginUser);

router.get("/verify-email/:token", verifyEmail);

export default router;
