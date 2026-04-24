import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: String,
      phone: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        total: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "bank_transfer", "other"],
      default: "cash",
    },
    notes: String,
    message: String,
    inquiry: {
      type: Boolean,
      default: false,
    },
    metadata: {
      ip: String,
      userAgent: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ store: 1, status: 1 });
orderSchema.index({ store: 1, createdAt: -1 });
orderSchema.index({ "customer.email": 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;