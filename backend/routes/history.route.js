import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import getSubmissionHistory from "../controllers/history.controller.js";
const historyroute = Router();

historyroute.get(
  "/history",
  authMiddleware(process.env.JWT_SECRET_USER),
  getSubmissionHistory,
);

export default historyroute;
