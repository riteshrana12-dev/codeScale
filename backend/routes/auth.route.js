import { Router } from "express";
import authController from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/signup", authController.signUpUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ success: true, message: "Logged out" });
});

export default authRouter;
