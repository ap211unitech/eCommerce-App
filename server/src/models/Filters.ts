import mongoose from "mongoose";

interface IFilter extends mongoose.Document {
  category: mongoose.Schema.Types.ObjectId;
  filters: Object;
}

const filterSchema = new mongoose.Schema<IFilter>(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    filters: {},
  },
  { timestamps: true }
);

export default mongoose.model<IFilter>("filter", filterSchema);
