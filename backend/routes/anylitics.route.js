import { Router } from "express";
import anyliticsController from "../controllers/anylitics.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const anlyticRouter = Router();

anlyticRouter.get(
  "/",
  authMiddleware(process.env.JWT_SECRET_USER),
  anyliticsController.getUserDashboard,
);

anlyticRouter.get(
  "/heatmap",
  authMiddleware(process.env.JWT_SECRET_USER),
  anyliticsController.getActivityHeatMap,
);

export default anlyticRouter;
