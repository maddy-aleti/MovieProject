import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        
        const exist = await User.findOne({ email });
        if(exist){
            return res.status(400).json({message: "User already exists"});
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
        });
        
        // JWT TOKEN (before return)
        const token = jwt.sign(
            { id: newUser._id, isVerified: newUser.isVerified },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        
        // NODEMAILER SETUP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        
        // SEND MAIL
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Account Created Successfully",
            text: `Hello ${username}, your account has been created successfully!`,
        });
        
          return res.status(201).json({
            message: "User registered & email sent!",
            token,
            user: {
                username: newUser.username,
                email: newUser.email,
                isVerified: newUser.isVerified,
            },
        });
        
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
};