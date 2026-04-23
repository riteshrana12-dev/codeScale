import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import askChatBot from "../controllers/chatbot.controller.js";

const chatbotRoute = Router();

chatbotRoute.post(
  "/ask",
  authMiddleware(process.env.JWT_SECRET_USER),
  askChatBot,
);

export default chatbotRoute;
