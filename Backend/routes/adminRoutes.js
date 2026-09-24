import express from "express";

import {
  getDashboard,
  getUsers,
  getOrders,
  updateOrderStatus,
  getPayments,
} from "../controller/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboard);

router.get("/users", protect, adminOnly, getUsers);

router.get("/orders", protect, adminOnly, getOrders);

router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

router.get("/payments", protect, adminOnly, getPayments);

export default router;
