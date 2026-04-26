import express from "express";
import {
  createStore,
  getMyStore,
  updateStore,
  publishStore,
  unpublishStore,
  getPublicStore,
  getStoresByCategory,
  deleteStore,
} from "../controllers/storeController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:slug", getPublicStore);
router.get("/category/:category", getStoresByCategory);

router.use(protect);

router.post("/", createStore);
router.get("/my", getMyStore);
router.put("/", updateStore);
router.post("/publish", publishStore);
router.post("/unpublish", unpublishStore);
router.delete("/", deleteStore);

export default router;