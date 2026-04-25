import { Router } from "express";
import profile from "../controllers/user.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get(
  "/profile",
  authMiddleware(process.env.JWT_SECRET_USER),
  profile.userProfile,
);

userRouter.put(
  "/profile",
  authMiddleware(process.env.JWT_SECRET_USER),
  profile.updateProfile,
);

userRouter.put(
  "/account",
  authMiddleware(process.env.JWT_SECRET_USER),
  profile.updateAccount,
);

export default userRouter;
