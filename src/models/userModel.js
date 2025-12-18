import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  // ✅ ADD THESE
  emailVerifyToken: {
    type: String,
  },

  emailVerifyExpires: {
    type: Date,
  },
});

export default mongoose.model("User", userSchema);
