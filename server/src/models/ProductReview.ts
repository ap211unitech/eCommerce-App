import mongoose from "mongoose";

interface IProductReviewSchema extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  rating: number; //  1 - 5
  description: string;
}

const productReviewSchema = new mongoose.Schema<IProductReviewSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProductReviewSchema>(
  "productReview",
  productReviewSchema
);
