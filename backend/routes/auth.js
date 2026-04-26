import express from "express";
import {
  register,
  login,
  verifyEmail,
  resendVerification,
  googleAuth,
  appleAuth,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter, otpLimiter } from "../middleware/rateLimiter.js";
import { validate, validateRegister, validateLogin } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", authLimiter, validateRegister, validate, register);
router.post("/login", authLimiter, validateLogin, validate, login);
router.post("/verify-email", otpLimiter, verifyEmail);
router.post("/resend-verification", otpLimiter, resendVerification);
router.post("/google", authLimiter, googleAuth);
router.post("/apple", authLimiter, appleAuth);
router.post("/forgot-password", otpLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", protect, logout);
router.post("/refresh-token", refreshToken);

export default router;