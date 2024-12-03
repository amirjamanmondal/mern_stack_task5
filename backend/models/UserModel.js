import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
    },
    username: {
      type: String,
      required: true,
      uniquie: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
