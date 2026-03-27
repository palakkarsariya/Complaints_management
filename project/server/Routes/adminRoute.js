import express from "express";
import { adminLogin } from "../controler/adminController.js";

const router = express.Router();

router.post("/login",adminLogin);

export default router;