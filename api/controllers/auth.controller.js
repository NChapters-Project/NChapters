import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { indexno, username, email, password } = req.body;
  const hashPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    indexno,
    username,
    email,
    password: hashPassword,
  });
  //show error to the user
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
