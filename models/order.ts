import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  downloadUrl: string;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  discount?: number;
  coupon?: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "razorpay";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  orderStatus: "pending" | "completed" | "cancelled";
  shippingEmail: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        downloadUrl: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    coupon: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    shippingEmail: {
      type: String,
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
