// middleware/admin.middleware.js

import userModel from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  const user = await userModel.findById(req.user_id);

  if (user && user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    succes: false,
    message: "Access Denied: Administrative privileges required.",
  });
};

export default adminMiddleware;
