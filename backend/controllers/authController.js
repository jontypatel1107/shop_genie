import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { AppError, asyncHandler } from "../middleware/index.js";
import { generateToken, generateRefreshToken } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, businessName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email already registered", 400));
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password,
    phone,
    businessName,
    authProvider: "email",
    verificationCode,
    verificationCodeExpires: Date.now() + 10 * 60 * 1000,
  });

  try {
    await sendEmail({
      to: email,
      subject: "ShopGenie - Verify Your Account",
      text: `Your verification code is: ${verificationCode}`,
      html: `
        <h1>Welcome to ShopGenie!</h1>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("\n========== DEV MODE OTP ==========");
    console.log(`Email: ${email}`);
    console.log(`OTP Code: ${verificationCode}`);
    console.log("==================================\n");
  }

  res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email to activate your account.",
    data: {
      requiresVerification: true,
      userId: user._id,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (user.authProvider !== "email" && user.password) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }
  } else if (user.authProvider !== "email" && !user.password) {
    return next(new AppError("Please use social login for this account", 401));
  } else {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }
  }

  if (!user.isActive) {
    return next(new AppError("Account has been deactivated", 401));
  }

  if (user.authProvider === "email" && !user.isVerified) {
    return next(new AppError("Please verify your email before logging in", 401));
  }

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
      refreshToken,
    },
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  const user = await User.findOne({
    verificationCode: code,
    verificationCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired verification code", 400));
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  await user.save({ validateBeforeSave: false });

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Email verified successfully. Your account is now active.",
    data: {
      user,
      token,
      refreshToken,
    },
  });
});

export const resendVerification = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("Email already verified", 400));
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode;
  user.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      to: email,
      subject: "ShopGenie - New Verification Code",
      text: `Your new verification code is: ${verificationCode}`,
      html: `<h1>Your new verification code is: <strong>${verificationCode}</strong></h1>`,
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("\n========== DEV MODE OTP ==========");
    console.log(`Email: ${email}`);
    console.log(`OTP Code: ${verificationCode}`);
    console.log("==================================\n");
  }

  res.json({
    success: true,
    message: "Verification code sent",
  });
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, sub: googleId, picture } = payload;

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      user.authProvider = "google";
      if (!user.avatar) user.avatar = picture;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId,
        authProvider: "google",
        isVerified: true,
      });
    }
  }

  if (!user.isActive) {
    return next(new AppError("Account has been deactivated", 401));
  }

  const jwtToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Google login successful",
    data: {
      user,
      token: jwtToken,
      refreshToken,
    },
  });
});

export const appleAuth = asyncHandler(async (req, res, next) => {
  const { appleUserId, email, name } = req.body;

  if (!appleUserId) {
    return next(new AppError("Apple user ID is required", 400));
  }

  let user = await User.findOne({ appleId: appleUserId });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.appleId = appleUserId;
      user.authProvider = "apple";
      await user.save();
    } else {
      user = await User.create({
        name: name || "Apple User",
        email: email || `${appleUserId}@apple.placeholder`,
        appleId: appleUserId,
        authProvider: "apple",
        isVerified: true,
      });
    }
  }

  if (!user.isActive) {
    return next(new AppError("Account has been deactivated", 401));
  }

  const jwtToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Apple login successful",
    data: {
      user,
      token: jwtToken,
      refreshToken,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: true,
      message: "If an account exists, a reset link has been sent",
    });
  }

  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: email,
      subject: "ShopGenie - Password Reset",
      text: `Click here to reset your password: ${resetUrl}`,
      html: `
        <h1>Password Reset</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#0f756b;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  res.json({
    success: true,
    message: "If an account exists, a reset link has been sent",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired reset token", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({
    success: true,
    message: "Password reset successful",
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return next(new AppError("Refresh token required", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== token) {
    return next(new AppError("Invalid refresh token", 401));
  }

  const newToken = generateToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    data: {
      token: newToken,
      refreshToken: newRefreshToken,
    },
  });
});