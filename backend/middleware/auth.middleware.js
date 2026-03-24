import jwt from "jsonwebtoken";
function authMiddleware(secret) {
  return async function (req, res, next) {
    const token = req.cookies?.userToken;
    console.log(token);
    if (!token) {
      console.log("invalid credentials");
      return res.status(403).json({
        message: "Incorrect Credentials",
      });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user_id = decoded.id;
      req.role = decoded.role;
      next();
    } catch (err) {
      return res.status(404).json({
        message: "Authentication failed",
      });
    }
  };
}

export default authMiddleware;
