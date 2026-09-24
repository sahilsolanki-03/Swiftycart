import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrder,
} from "../controller/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrder);

export default router;
