import mongoose from "mongoose";

interface IFilter extends mongoose.Document {
  category: mongoose.Schema.Types.ObjectId;
  filters: Object;
}

const filterSchema = new mongoose.Schema<IFilter>(
  {
    filters: {},
  },
  { timestamps: true }
);

export default mongoose.model<IFilter>("filter", filterSchema);
