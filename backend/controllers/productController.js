import { Product, Store } from "../models/index.js";
import { AppError, asyncHandler } from "../middleware/index.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Create a store first", 400));
  }

  const product = await Product.create({
    store: store._id,
    ...req.body,
  });

  res.status(201).json({
    success: true,
    message: "Product created",
    data: { product },
  });
});

export const getMyProducts = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  const { page = 1, limit = 20, category, status, search } = req.query;

  const query = { store: store._id };

  if (category) query.category = category;
  if (status) query.status = status;
  if (search) {
    query.$text = { $search: search };
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.viewCount += 1;
  await product.save();

  res.json({
    success: true,
    data: { product },
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const store = await Store.findOne({ user: req.user._id });

  const product = await Product.findOne({ _id: id, store: store._id });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  Object.assign(product, req.body);
  await product.save();

  res.json({
    success: true,
    message: "Product updated",
    data: { product },
  });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const store = await Store.findOne({ user: req.user._id });

  const product = await Product.findOneAndDelete({ _id: id, store: store._id });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.json({
    success: true,
    message: "Product deleted",
  });
});

export const toggleFeatured = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const store = await Store.findOne({ user: req.user._id });

  const product = await Product.findOne({ _id: id, store: store._id });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.featured = !product.featured;
  await product.save();

  res.json({
    success: true,
    message: `Product ${product.featured ? "featured" : "unfeatured"}`,
    data: { product },
  });
});

export const bulkUpdate = asyncHandler(async (req, res, next) => {
  const { ids, action } = req.body;
  const store = await Store.findOne({ user: req.user._id });

  if (!ids || !action) {
    return next(new AppError("IDs and action are required", 400));
  }

  let update = {};
  switch (action) {
    case "activate":
      update = { status: "active" };
      break;
    case "archive":
      update = { status: "archived" };
      break;
    case "delete":
      await Product.deleteMany({ _id: { $in: ids }, store: store._id });
      return res.json({ success: true, message: "Products deleted" });
    default:
      return next(new AppError("Invalid action", 400));
  }

  await Product.updateMany({ _id: { $in: ids }, store: store._id }, update);

  res.json({
    success: true,
    message: `Products ${action}d`,
  });
});