import { Store, Product } from "../models/index.js";
import { AppError, asyncHandler } from "../middleware/index.js";

export const createStore = asyncHandler(async (req, res, next) => {
  const { name, category, description, phone, email, address, theme } = req.body;

  const existingStore = await Store.findOne({ user: req.user._id });
  if (existingStore) {
    return next(new AppError("You already have a store. Use update instead.", 400));
  }

  const store = await Store.create({
    user: req.user._id,
    name,
    category,
    description,
    phone,
    email,
    address,
    theme,
  });

  res.status(201).json({
    success: true,
    message: "Store created successfully",
    data: { store },
  });
});

export const getMyStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id }).populate("user", "name email");

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  res.json({
    success: true,
    data: { store },
  });
});

export const updateStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  const allowedFields = [
    "name", "logo", "banner", "category", "description", "phone", "email",
    "address", "theme", "settings", "socialLinks", "metadata"
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      store[field] = req.body[field];
    }
  });

  await store.save();

  res.json({
    success: true,
    message: "Store updated",
    data: { store },
  });
});

export const publishStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  store.isPublished = true;
  store.publishedAt = Date.now();
  await store.save();

  res.json({
    success: true,
    message: "Store published successfully",
    data: { store },
  });
});

export const unpublishStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  store.isPublished = false;
  await store.save();

  res.json({
    success: true,
    message: "Store unpublished",
    data: { store },
  });
});

export const getPublicStore = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const store = await Store.findOne({
    $or: [{ slug }, { subdomain: slug }, { _id: slug }],
    isPublished: true,
  }).populate("user", "name");

  if (!store) {
    return next(new AppError("Store not found or not published", 404));
  }

  store.visitorCount += 1;
  await store.save();

  const products = await Product.find({
    store: store._id,
    status: "active",
    visibility: "public",
  }).sort({ featured: -1, sortOrder: 1, createdAt: -1 });

  res.json({
    success: true,
    data: { store, products },
  });
});

export const getStoresByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;

  const stores = await Store.find({ category, isPublished: true })
    .populate("user", "name")
    .sort({ visitorCount: -1 });

  res.json({
    success: true,
    data: { stores },
  });
});

export const deleteStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  await Product.deleteMany({ store: store._id });
  await store.deleteOne();

  res.json({
    success: true,
    message: "Store and associated products deleted",
  });
});