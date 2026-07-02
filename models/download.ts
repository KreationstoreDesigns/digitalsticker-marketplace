import mongoose, { Document, Schema } from "mongoose";

export interface IDownload extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  downloadToken: string;
  expiresAt: Date;
  downloadCount: number;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const downloadSchema = new Schema<IDownload>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    downloadToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Download =
  mongoose.models.Download ||
  mongoose.model<IDownload>("Download", downloadSchema);
