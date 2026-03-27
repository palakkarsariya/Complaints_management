import express from 'express'
import loginUser from '../controler/logincontroler.js'
import {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controler/usercontroler.js"

const router = express.Router();

router.post('/loginUser',loginUser)
router.post("/addUser", addUser);
router.get("/allUser", getUsers);
router.get("/users/:id", getUserById);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;