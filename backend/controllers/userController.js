import { User } from "../models/index.js";
import { AppError, asyncHandler } from "../middleware/index.js";

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    data: { user },
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, phone, businessName, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, businessName, avatar },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: "Profile updated",
    data: { user },
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.password) {
    return next(new AppError("No password set for this account", 400));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new AppError("Current password is incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: "Password updated successfully",
  });
});

export const deleteAccount = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: "Account deactivated",
  });
});