import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // 🔹 Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // 🔹 Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 Compare password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 🔹 Generate token
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    // 🔹 Send response
    res.status(200).json({
      success: true,
      token,
      userId: user._id,
      email: user.email,
      department: user.department || null,
      zone: user.zone || null
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

export { login };