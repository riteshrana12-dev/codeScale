import { Router } from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import adminController from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const adminRouter = Router();
// --- Problem Management ---

adminRouter.get(
  "/all-problem",
  authMiddleware(process.env.JWT_SECRET_USER),
  adminController.getAllproblems,
);
adminRouter.post(
  "/add-problem",
  authMiddleware(process.env.JWT_SECRET_USER),
  adminMiddleware,
  adminController.addProblem,
);
adminRouter.put(
  "/update-problem/:id",
  authMiddleware(process.env.JWT_SECRET_USER),
  adminController.updateProblem,
);
adminRouter.delete(
  "/delete-problem/:id",
  authMiddleware(process.env.JWT_SECRET_USER),
  adminController.deleteProblem,
);

export default adminRouter;
