import { Order, Store, Product } from "../models/index.js";
import { AppError, asyncHandler } from "../middleware/index.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  const { storeId } = req.params;
  const { customer, items, notes, message, inquiry } = req.body;

  const store = await Store.findById(storeId);
  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  let orderItems = [];
  let subtotal = 0;

  if (items && items.length > 0) {
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return next(new AppError(`Product ${item.product} not found`, 404));
      }
      const itemTotal = product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });
      subtotal += itemTotal;
    }
  }

  const order = await Order.create({
    store: store._id,
    customer,
    items: orderItems,
    subtotal,
    total: subtotal,
    notes,
    message,
    inquiry: inquiry || false,
    metadata: {
      ip: req.ip,
      userAgent: req.get("user-agent"),
    },
  });

  res.status(201).json({
    success: true,
    message: inquiry ? "Inquiry submitted" : "Order placed successfully",
    data: { order },
  });
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  const { page = 1, limit = 20, status } = req.query;

  const query = { store: store._id };
  if (status) query.status = status;

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;
  const store = await Store.findOne({ user: req.user._id });

  const order = await Order.findOne({ _id: id, store: store._id });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  res.json({
    success: true,
    message: "Order updated",
    data: { order },
  });
});

export const getOrderStats = asyncHandler(async (req, res, next) => {
  const store = await Store.findOne({ user: req.user._id });

  if (!store) {
    return next(new AppError("Store not found", 404));
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalOrders, pendingOrders, completedOrders, inquiries] = await Promise.all([
    Order.countDocuments({ store: store._id }),
    Order.countDocuments({ store: store._id, status: "pending" }),
    Order.countDocuments({ store: store._id, status: "delivered" }),
    Order.countDocuments({ store: store._id, inquiry: true }),
  ]);

  const monthlyOrders = await Order.countDocuments({
    store: store._id,
    createdAt: { $gte: startOfMonth },
  });

  res.json({
    success: true,
    data: {
      totalOrders,
      pendingOrders,
      completedOrders,
      inquiries,
      monthlyOrders,
    },
  });
});