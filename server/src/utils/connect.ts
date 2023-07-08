import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
