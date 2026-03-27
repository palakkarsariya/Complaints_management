import mongoose from "mongoose";

const departmentUserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  department: {
    type: String,
    enum: [
      "Water Supply",
      "Electricity",
      "Garbage Issue",
      "Road Damage"
    ],
    required: true
  },

  zone: {
    type: String,
    enum: [
      "Central Zone",
      "North Zone",
      "South Zone",
      "East Zone",
      "West Zone",
      "South West Zone",
      "South East Zone"
    ],
    required: true
  },

  role: {
    type: String,
    default: "officer"
  }

}, { timestamps: true });

export default mongoose.model(
  "DepartmentUser",
  departmentUserSchema
);