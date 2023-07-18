import mongoose from "mongoose";

interface IOtp extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    otp: {
      type: String,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>("otp", otpSchema);
