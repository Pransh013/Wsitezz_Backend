import { Request, Response } from "express";
import { signinSchema } from "../../utils/validations";
import User from "../../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSigninController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { success } = signinSchema.safeParse({ email, password });
  if (!success) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const userId = user._id;
  const jwtSecret = process.env.JWT_SECRET || "defaultsecret";
  const token = jwt.sign({ userId }, jwtSecret);
  return res.json({
    message: "Logged in successfully",
    token,
  });
};

export default userSigninController;
