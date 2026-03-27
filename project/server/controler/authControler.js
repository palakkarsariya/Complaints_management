import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {

    return res.json({
      success: false,
      message: "Invalid credentials"
    });

  }

  const token = jwt.sign(
    { id: user._id },
    "secretkey"
  );

  res.json({
    success: true,
    token,
    department: user.department,
    zone: user.zone
  });

};

export { login };