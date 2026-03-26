import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import submissionProblem from "../controllers/submission.controller.js";
const submissionRoutes = Router();

submissionRoutes.post(
  "/:id/submit",
  authMiddleware(process.env.JWT_SECRET_USER),
  submissionProblem,
);

export default submissionRoutes;
