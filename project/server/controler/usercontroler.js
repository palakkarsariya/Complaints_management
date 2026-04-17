import User from "../Models/User.js";
import bcrypt from "bcryptjs";

// ------------------------------------------------------
// ⭐ Add New User
// ------------------------------------------------------
export const addUser = async (req, res) => {

  try {

    const { name, email, address, password } = req.body;

    // 🔹 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required"
      });
    }

    // 🔹 Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // 🔹 Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const newUser = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {

    console.error("Add User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while adding user"
    });

  }

};

// ------------------------------------------------------
// ⭐ Get All Users
// ------------------------------------------------------
export const getUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password") // 🔒 hide password
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {

    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching users"
    });

  }

};

// ------------------------------------------------------
// ⭐ Get Single User
// ------------------------------------------------------
export const getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.error("Get User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching user"
    });

  }

};

// ------------------------------------------------------
// ⭐ Update User
// ------------------------------------------------------
export const updateUser = async (req, res) => {

  try {

    const { name, email, address, role, status, password } = req.body;

    let updateData = { name, email, address, role, status };

    // 🔹 If password updated → hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.error("Update User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating user"
    });

  }

};

// ------------------------------------------------------
// ⭐ Delete User
// ------------------------------------------------------
export const deleteUser = async (req, res) => {

  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting user"
    });

  }

};