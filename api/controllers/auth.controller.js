import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // const { indexno, email, password } = req.body;
  const { email, password } = req.body;
  try {
    const vlaiduser = await User.findOne({ email });
    if (!vlaiduser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcryptjs.compare(password, vlaiduser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Creadentials!"));
    const token = Jwt.sign({ id: vlaiduser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = vlaiduser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
