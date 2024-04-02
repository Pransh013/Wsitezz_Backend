import { Request, Response } from "express";
import { signupSchema } from "../../utils/validations";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupBody } from "../../utils/types";

const userSignupController = async (
  req: Request<{}, {}, signupBody>,
  res: Response
) => {
  const { email, password, firstName, lastName } = req.body;

  const { success } = signupSchema.safeParse({
    email,
    password,
    firstName,
    lastName,
  });

  if (!success) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  try {
    // checking for an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // creating jwt token
    const userId = user._id;
    const jwtSecret = process.env.JWT_SECRET || "defaultsecret";
    const token = jwt.sign({ userId }, jwtSecret);
    return res.json({
      message: "User created successfully",
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default userSignupController;
