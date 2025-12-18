import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import validator from "validator";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  try {
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address",
        });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        emailVerifyToken: verifyToken,
        emailVerifyExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const verifyLink = `http://localhost:5000/api/auth/verify-email/${verifyToken}`;

    await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Account Created Successfully",
    text: `Hello ${username},

    Your account has been created successfully.

    Please verify your email by clicking the link below:
    ${verifyLink}

    This link is valid for 24 hours.
    `,
    });

    return res.status(201).json({
      message: "Registration successful. Please verify your email and login.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
