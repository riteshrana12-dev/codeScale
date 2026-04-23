import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import getSubmissionHistory from "../controllers/user_history.controller.js";
import getSubmissionViewById from "../controllers/submissionDetail.controller.js";
const historyroute = Router();

historyroute.get(
  "/history",
  authMiddleware(process.env.JWT_SECRET_USER),
  getSubmissionHistory,
);

historyroute.get(
  "/history/detailview/:id",
  authMiddleware(process.env.JWT_SECRET_USER),
  getSubmissionViewById,
);

export default historyroute;
