import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import problemsRoutes from "./routes/problems.route.js";
import connectToDb from "./config/db.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1/problems", problemsRoutes);
(async () => {
  try {
    await connectToDb();
    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error("Failed to connect to DB. Server not started.", err.message);
    process.exit(1);
  }
})();
