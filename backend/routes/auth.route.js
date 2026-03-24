import { Router } from "express";
import authController from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/signupuser", authController.registerUser);
authRouter.post("/loginuser", authController.loginUser);

export default authRouter;
