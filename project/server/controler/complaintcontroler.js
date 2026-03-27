import axios from "axios";
import Complaint from "../Models/complaint.js";
import multer from "multer";
import path from "path";

/* ===============================
   Multer Setup
=================================*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* ===============================
   Zone Mapping (Surat)
=================================*/
const zoneMap = {
  "395001": "Central Zone",
  "395002": "Central Zone",
  "395003": "North Zone",
  "395004": "East Zone",
  "395005": "West Zone",
  "395006": "South Zone",
  "395007": "South West Zone",
};

/* ===============================
   Geocode Function
=================================*/
const geocodeLocation = async ({ pincode, location }) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          country: "India",
          postalcode: pincode || undefined,
          q: location || undefined,
          email: "palak.karsariya@gmail.com",
        },
        headers: {
          "User-Agent": "CityVisionApp/1.0 (palak.karsariya@gmail.com)",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    }

    return { lat: null, lon: null };
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return { lat: null, lon: null };
  }
};

/* ===============================
   Add Complaint
=================================*/
const addComplaint = async (req, res) => {
  try {
    const { userId, name, category, location, pincode, description } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!userId || !name || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* Detect Zone from Pincode */
    const zone = zoneMap[pincode] || "Unknown Zone";

    /* Get Latitude & Longitude */
    const { lat, lon } = await geocodeLocation({ pincode, location });

    const complaint = new Complaint({
      userId,
      name,
      category,
      location,
      pincode,
      zone,
      description,
      image,
      latitude: lat,
      longitude: lon,
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint added successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error adding complaint:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding complaint",
    });
  }
};

/* ===============================
   Get All Complaints (Admin)
=================================*/
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    const formatted = complaints.map((c) => ({
      ...c._doc,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching complaints",
    });
  }
};

/* ===============================
   Get User Complaints
=================================*/
const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.params.userId,
    });

    const formatted = complaints.map((c) => ({
      ...c._doc,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching user complaints",
    });
  }
};

/* ===============================
   Update Complaint
=================================*/
const updateComplaint = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    updatedComplaint.image = updatedComplaint.image
      ? `http://localhost:1300/uploads/${updatedComplaint.image}`
      : null;

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating complaint",
    });
  }
};

/* ===============================
   Delete Complaint
=================================*/
const deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting complaint",
    });
  }
};

/* ===============================
   Get Department Complaints
=================================*/
const getDepartmentComplaints = async (req, res) => {
  try {
    const { category, zone } = req.query;

    const complaints = await Complaint.find({
      category,
      zone,
    });

    const formatted = complaints.map((c) => ({
      ...c._doc,
      image: c.image
        ? `http://localhost:1300/uploads/${c.image}`
        : null,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching department complaints",
    });
  }
};

/* ===============================
   Export
=================================*/
export {
  upload,
  addComplaint,
  getAllComplaints,
  getUserComplaints,
  updateComplaint,
  deleteComplaint,
  getDepartmentComplaints,
};