import express from "express";
import {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getOrderStats,
} from "../controllers/orderController.js";
import { protect, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/store/:storeId", optionalAuth, createOrder);

router.use(protect);

router.get("/", getMyOrders);
router.put("/:id", updateOrderStatus);
router.get("/stats", getOrderStats);

export default router;