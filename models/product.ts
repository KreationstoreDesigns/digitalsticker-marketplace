import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: mongoose.Types.ObjectId;
  images: string[];
  thumbnail: string;
  downloadUrl: string;
  fileSize: string;
  formats: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      default: "Unknown",
    },
    formats: {
      type: [String],
      default: ["PNG", "SVG"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      default: null,
    },
    seoDescription: {
      type: String,
      default: null,
    },
    seoKeywords: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: -1,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
