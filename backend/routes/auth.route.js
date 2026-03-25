import { Router } from "express";
import authController from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/signupUser", authController.registerUser);
authRouter.post("/loginUser", authController.loginUser);

export default authRouter;
