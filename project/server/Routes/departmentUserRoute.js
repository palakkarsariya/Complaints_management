import express from "express";
import {
addDepartmentUser,
getDepartmentUsers,
updateDepartmentUser,
deleteDepartmentUser
} from "../controler/departmentUserController.js";

const router = express.Router();

router.post("/add",addDepartmentUser);

router.get("/get",getDepartmentUsers);

router.put("/update/:id",updateDepartmentUser);

router.delete("/delete/:id",deleteDepartmentUser);

export default router;