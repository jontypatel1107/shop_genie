import express from "express";
import {
  getMe,
  updateProfile,
  updatePassword,
  deleteAccount,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);

router.get("/me", getMe);
router.put("/profile", updateProfile);
router.put("/password", updatePassword);
router.delete("/account", deleteAccount);

export default router;