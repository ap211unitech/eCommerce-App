import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name can not be empty"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email can not be empty"],
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
});

export default mongoose.model<IUser>("user", userSchema);
