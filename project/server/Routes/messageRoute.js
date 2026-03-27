import express from "express";

import {
sendMessage,
getMessages,
deleteMessage
} from "../controler/messageController.js";

const router = express.Router();

router.post("/send",sendMessage);

router.get("/get",getMessages);

router.delete("/delete/:id",deleteMessage);

export default router;