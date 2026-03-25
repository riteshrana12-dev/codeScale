import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const registerUser = async (req, res) => {
  try {
    const requiredBody = z.object({
      firstName: z.string().min(2).max(15),
      lastName: z.string().min(2).max(15),
      email: z.string().min(11).max(30).email(),
      password: z.string().min(6).max(10),
      // role: z.string(),
    });

    const parsedBodyWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedBodyWithSuccess.success) {
      return res.json({
        message: "incorrect fromat",
        error: parsedBodyWithSuccess.error,
      });
    }

    const { firstName, lastName, email, password } = parsedBodyWithSuccess.data;
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "learner",
    });

    res.status(201).json({
      message: "user",
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(11).max(30).email(),
    password: z.string().min(6).max(10),
  });

  const parsedBodyWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedBodyWithSuccess) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedBodyWithSuccess.error,
    });
  }

  const { email, password } = parsedBodyWithSuccess.data;

  const isAlreadyExist = await userModel.findOne({
    email,
  });

  if (!isAlreadyExist) {
    return res.status(400).json({
      message: "user Not found",
    });
  }

  const hashed = await bcrypt.compare(password, isAlreadyExist.password);

  if (!hashed) {
    return res.status(400).json({
      message: "password invalid",
    });
  }

  const Token = jwt.sign(
    {
      id: isAlreadyExist._id,
      role: isAlreadyExist.role,
    },
    process.env.JWT_SECRET_USER,
    { expiresIn: "7d" },
  );

  res.cookie("userToken", Token);

  res.json({
    message: "sign in successful",
    user: isAlreadyExist,
    Token,
  });
};

export default { registerUser, loginUser };
