import DepartmentUser from "../Models/departmentUser.js";
import jwt from "jsonwebtoken";

const departmentLogin = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await DepartmentUser.findOne({ email });

    if (!user || user.password !== password) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      department: user.department,
      zone: user.zone
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

export { departmentLogin };