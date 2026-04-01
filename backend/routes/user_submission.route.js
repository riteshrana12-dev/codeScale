import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import submissionProblem from "../controllers/user_submission.controller.js";
const submissionRoutes = Router();

submissionRoutes.post(
  "/:slug/submit",
  authMiddleware(process.env.JWT_SECRET_USER),
  submissionProblem,
);

export default submissionRoutes;
