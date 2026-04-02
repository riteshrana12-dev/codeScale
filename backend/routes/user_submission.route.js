import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import submission from "../controllers/user_submission.controller.js";

const submissionRoutes = Router();

submissionRoutes.post(
  "/:slug/run-code",
  authMiddleware(process.env.JWT_SECRET_USER),
  submission.submissionProblem,
);

submissionRoutes.post(
  "/:slug/submit",
  authMiddleware(process.env.JWT_SECRET_USER),
  submission.submitCode,
);

export default submissionRoutes;
