import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    comparePrice: {
      type: Number,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    category: {
      type: String,
      trim: true,
    },
    tags: [String],
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
    sku: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
    visibility: {
      type: String,
      enum: ["public", "hidden"],
      default: "public",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    metadata: {
      weight: String,
      dimensions: String,
      colors: [String],
      sizes: [String],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ store: 1, status: 1 });
productSchema.index({ store: 1, category: 1 });
productSchema.index({ name: "text", description: "text" });
productSchema.index({ featured: 1 });

productSchema.virtual("isLowStock").get(function () {
  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

productSchema.virtual("isOutOfStock").get(function () {
  return this.stock === 0;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);
export default Product;