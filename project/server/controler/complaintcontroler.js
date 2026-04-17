import axios from "axios";
import Complaint from "../Models/complaint.js";
import multer from "multer";
import path from "path";

/* =====================================================
   📁 Multer Setup (File Upload)
===================================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* =====================================================
   🗺️ Zone Mapping (Surat)
===================================================== */
const zoneMap = {
  "395001": "Central Zone",
  "395002": "Central Zone",
  "395003": "North Zone",
  "395004": "East Zone",
  "395005": "West Zone",
  "395006": "South Zone",
  "395007": "South West Zone",
};

/* =====================================================
   🌍 Geocode Function (Improved)
===================================================== */
const geocodeLocation = async ({ pincode, location }) => {
  try {

    const query = `${location}, Surat, Gujarat, India ${pincode || ""}`;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: query,
          limit: 1,
        },
        headers: {
          "User-Agent": "CityVisionApp/1.0 (your-email@gmail.com)",
        },
      }
    );

    if (response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    }

    return { lat: null, lon: null };

  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return { lat: null, lon: null };
  }
};

/* =====================================================
   ➕ Add Complaint
===================================================== */
const addComplaint = async (req, res) => {

  try {

    const {
      userId,
      name,
      category,
      location,
      pincode,
      description
    } = req.body;

    const image = req.file ? req.file.filename : null;

    // 🔹 Validation
    if (!userId || !name || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // 🔹 Zone Detection
    const zone = zoneMap[pincode] || "Unknown Zone";

    // 🔹 Get Coordinates
    const { lat, lon } = await geocodeLocation({ pincode, location });

    // 🔥 Fallback (Never store null)
    const latitude = lat || 21.1702;
    const longitude = lon || 72.8311;

    // 🔹 Create Complaint
    const complaint = await Complaint.create({
      userId,
      name,
      category,
      location,
      pincode,
      zone,
      description,
      image,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Complaint added successfully",
      complaint
    });

  } catch (error) {

    console.error("Add Complaint Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while adding complaint"
    });

  }
};

/* =====================================================
   📋 Get All Complaints (Admin)
===================================================== */
const getAllComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find().sort({ createdAt: -1 });

    const formatted = complaints.map((c) => ({
      ...c._doc,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      complaints: formatted
    });

  } catch (error) {

    console.error("Get All Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching complaints"
    });

  }
};

/* =====================================================
   👤 Get User Complaints
===================================================== */
const getUserComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    const formatted = complaints.map((c) => ({
      id: c._id,
      userId: c.userId,
      name: c.name,
      category: c.category,
      location: c.location,
      pincode: c.pincode,
      zone: c.zone,
      description: c.description,
      status: c.status,
      createdAt: c.createdAt,
      latitude: c.latitude,
      longitude: c.longitude,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json({
      success: true,
      complaints: formatted
    });

  } catch (error) {

    console.error("User Complaints Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching user complaints"
    });

  }
};

/* =====================================================
   ✏️ Update Complaint
===================================================== */
const updateComplaint = async (req, res) => {

  try {

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    updated.image = updated.image
      ? `http://localhost:1300/uploads/${updated.image}`
      : null;

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint: updated
    });

  } catch (error) {

    console.error("Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Error updating complaint"
    });

  }
};

/* =====================================================
   ❌ Delete Complaint
===================================================== */
const deleteComplaint = async (req, res) => {

  try {

    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully"
    });

  } catch (error) {

    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Error deleting complaint"
    });

  }
};

/* =====================================================
   🏢 Get Department Complaints
===================================================== */
const getDepartmentComplaints = async (req, res) => {

  try {

    const { category, zone } = req.query;

    const complaints = await Complaint.find({ category, zone });

    const formatted = complaints.map((c) => ({
      ...c._doc,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json({
      success: true,
      complaints: formatted
    });

  } catch (error) {

    console.error("Department Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching department complaints"
    });

  }
};

/* =====================================================
   🚀 Export
===================================================== */
export {
  upload,
  addComplaint,
  getAllComplaints,
  getUserComplaints,
  updateComplaint,
  deleteComplaint,
  getDepartmentComplaints,
};