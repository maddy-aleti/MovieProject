import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginUser = async(req,res)=>{
    try{
        const { email, password } =req.body;

        //validation
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // 🚫 Verification check
        if (!user.isVerified) {
        return res.status(403).json({
            message: "Please verify your email before logging in",
        });
        }
        // JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, isVerified: user.isVerified },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
            },
        });
        }catch(error){
            res.status(500).json({ message: error.message });
        }
};