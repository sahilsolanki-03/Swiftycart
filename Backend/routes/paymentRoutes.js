import express from "express";

import {
  createPayment,
  getMyPayments,
} from "../controller/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPayment);
router.get("/my", protect, getMyPayments);

export default router;
