import express from "express";
import { addComplaint, getAllComplaints, updateComplaint,
  deleteComplaint,getUserComplaints,getDepartmentComplaints,
  upload } from "../controler/complaintcontroler.js";

const router = express.Router();

// Handle file upload with multer middleware
router.post("/addComp", upload.single("image"), addComplaint);
router.get("/getall",getAllComplaints)
router.put("/update/:id", upload.single("image"), updateComplaint);
router.delete("/delete/:id", deleteComplaint);
router.get("/user/:userId", getUserComplaints);
// router.get("/waterComplaints", getWaterComplaints);
router.get("/department", getDepartmentComplaints);

export default router;
