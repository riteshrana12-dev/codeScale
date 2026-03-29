import { Router } from "express";
import analyticsController from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const analyticsRouter = Router();

analyticsRouter.get(
  "/",
  authMiddleware(process.env.JWT_SECRET_USER),
  analyticsController.getUserDashboard,
);

analyticsRouter.get(
  "/heatmap",
  authMiddleware(process.env.JWT_SECRET_USER),
  analyticsController.getActivityHeatMap,
);

analyticsRouter.get(
  "/leaderboard",
  authMiddleware(process.env.JWT_SECRET_USER),
  analyticsController.getLeaderboard,
);

export default analyticsRouter;
