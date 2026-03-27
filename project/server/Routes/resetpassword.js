import express from "express";
import bcrypt from "bcryptjs";
import User from '../Models/User.js'

const router = express.Router();

router.post("/reset-pass", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;   
