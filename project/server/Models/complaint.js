import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  category: String,
  location: String,
  pincode: String,
  zone: String,
  description: String,
  status: {
    type: String,
    default: "Pending"
  },

  latitude: Number,
  longitude: Number,
  image: String

}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);