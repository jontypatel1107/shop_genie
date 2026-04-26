import express from "express";
import {
  createProduct,
  getMyProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  bulkUpdate,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { validate, validateProduct } from "../middleware/validate.js";

const router = express.Router();

router.get("/:id", getProduct);

router.use(protect);

router.post("/", validateProduct, validate, createProduct);
router.get("/", getMyProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/featured", toggleFeatured);
router.post("/bulk", bulkUpdate);

export default router;