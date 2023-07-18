import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "vendor" | "admin";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password can not be empty"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number can not be empty"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("user", userSchema);
