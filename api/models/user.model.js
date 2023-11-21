import mongoose from "mongoose";

//Create the rule(Schema)
const userSchema = new mongoose.Schema(
  {
    indexno: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Create the model
const User = mongoose.model("User", userSchema);

export default User;
