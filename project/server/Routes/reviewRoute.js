import express from "express";

import {
addReview,
getReviews,
deleteReview
} from "../controler/reviewController.js";

const router = express.Router();

router.post("/add",addReview);

router.get("/get",getReviews);

router.delete("/delete/:id",deleteReview);

export default router;