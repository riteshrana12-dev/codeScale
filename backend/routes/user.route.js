import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get(
  "/profile",
  authMiddleware(process.env.JWT_SECRET_USER),
  userController.userProfile,
);
userRouter.get(
  "/dashboard",
  authMiddleware(process.env.JWT_SECRET_USER),
  userController.getUserDashboard,
);

export default userRouter;
