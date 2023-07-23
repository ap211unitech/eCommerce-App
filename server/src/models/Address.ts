import mongoose from "mongoose";

interface IUserAddressSchema extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  userName: string;
  mobile: string;
  pincode: string;
  state: string;
  address: string;
  locality: string;
  city: string;
  type: "home" | "office";
  isDefault: boolean;
}

const userAddressSchema = new mongoose.Schema<IUserAddressSchema>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["home", "office"],
    required: true,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.model<IUserAddressSchema>(
  "userAddress",
  userAddressSchema
);
