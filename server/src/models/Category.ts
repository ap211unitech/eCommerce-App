import mongoose from "mongoose";

interface ICategory extends mongoose.Document {
  name: string;
  slug: string;
  parentId: mongoose.Schema.Types.ObjectId;
  filter: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: String,
    },
    filter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "filter",
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

export default mongoose.model<ICategory>("category", categorySchema);
