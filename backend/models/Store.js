import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      maxlength: [100, "Store name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    logo: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["grocery", "clothing", "electronics", "restaurant", "other"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    theme: {
      type: String,
      enum: ["modern", "classic", "bright", "minimal"],
      default: "modern",
    },
    settings: {
      whatsapp: String,
      customDomain: String,
      showPrices: { type: Boolean, default: true },
      contactFormEnabled: { type: Boolean, default: true },
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    subdomain: {
      type: String,
      unique: true,
      sparse: true,
    },
    visitorCount: {
      type: Number,
      default: 0,
    },
    metadata: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

storeSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

storeSchema.index({ user: 1 });
storeSchema.index({ slug: 1 });
storeSchema.index({ subdomain: 1 });
storeSchema.index({ category: 1 });

const Store = mongoose.model("Store", storeSchema);
export default Store;