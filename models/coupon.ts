import mongoose, { Document, Schema } from "mongoose";

export interface ICoupon extends Document {
  _id: mongoose.Types.ObjectId;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  validFrom: Date;
  validUntil: Date;
  minOrderAmount?: number;
  maxDiscount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    maxUses: {
      type: Number,
      required: true,
      min: 1,
    },
    currentUses: {
      type: Number,
      default: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    maxDiscount: {
      type: Number,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Coupon =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);
