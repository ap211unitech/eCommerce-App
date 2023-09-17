import mongoose from "mongoose";

interface IProductSchema extends mongoose.Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  specifications: Record<string, string>; //  {string: string}
  gallery: string[];
  filters: Record<string, string[]>;
  variations: mongoose.Schema.Types.ObjectId[]; // List of products by same vendor/admin that are variations to this product
  price: number;
  avaliableQuantity: number;
  discount: number; // 0-100 % in number
  rating: number; // Will update in when review will add
  isFeatured: boolean;
  isArchived: boolean;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProductSchema>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Product name can not be empty"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Product slug can not be empty"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description can not be empty"],
    },
    specifications: {},
    gallery: [{ type: String }],
    filters: {},
    variations: [{ type: String }],
    price: {
      type: Number,
      required: [true, "Product Price can not be empty"],
    },
    avaliableQuantity: {
      type: Number,
      required: true,
      default: 10,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProductSchema>("product", productSchema);
