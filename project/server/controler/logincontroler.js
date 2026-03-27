import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // ✅ Compare password (plain text vs hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // ✅ Respond with token and user info
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("🔥 Error in loginUser:", error);
    return res.status(500).json({ success: false, error: "Login server error" });
  }
};

export default loginUser;
