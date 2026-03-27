import express from "express";
import { departmentLogin } from "../controler/departmentAuthController.js";

const router = express.Router();

router.post("/login", departmentLogin);

export default router;