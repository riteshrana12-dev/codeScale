import { Router } from "express";
import userProfile from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get(
  "/profile",
  authMiddleware(process.env.JWT_SECRET_USER),
  userProfile,
);

export default userRouter;
