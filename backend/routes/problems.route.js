import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import problemsController from "../controllers/problems.controller.js";

const problemsRoutes = Router();

problemsRoutes.get(
  "/",
  authMiddleware(process.env.JWT_SECRET_USER),
  problemsController.problemsList,
);

problemsRoutes.get(
  "/problem/:id",
  authMiddleware(process.env.JWT_SECRET_USER),
  problemsController.problems,
);

export default problemsRoutes;
