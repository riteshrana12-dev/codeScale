import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import problemsRoutes from "./routes/problems.route.js";
import submissionRoutes from "./routes/submission.route.js";
import userRouter from "./routes/user.route.js";
import connectToDb from "./config/db.js";
import fs from "fs";
import path from "path";
import analyticsRouter from "./routes/analytics.route.js";
import historyroute from "./routes/history.route.js";

const app = express();

// Middleware configuration
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  }),
);
app.use(cookieParser());

/**
 * Function to clean up the 'temp' directory on server startup.
 * This prevents storage buildup if the server crashed during previous executions.
 */
const cleanupTempFolder = () => {
  try {
    const tempDir = path.join(process.cwd(), "temp");

    // Check if the directory exists before attempting to read it
    if (fs.existsSync(tempDir)) {
      const files = fs.readdirSync(tempDir);

      files.forEach((file) => {
        const filePath = path.join(tempDir, file);

        // Ensure we only delete files, not subdirectories
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
          console.log(`🧹 Cleaned up: ${file}`);
        }
      });
      console.log(" Temporary storage cleared successfully.");
    }
  } catch (err) {
    console.error(" Error during temp cleanup:", err.message);
  }
};

// Route Definitions
app.use("/api/v1", authRoutes);
app.use("/api/v1/problems", problemsRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/user", historyroute);

// Database connection and Server Activation

(async () => {
  try {
    await connectToDb();

    // Run cleanup immediately after DB connection but before listening for requests
    cleanupTempFolder();

    app.listen(3000, () => {
      console.log(" Server is running on port 3000");
    });
  } catch (err) {
    console.error(
      "Critical Failure: Could not connect to DB. Server shutting down.",
      err.message,
    );
    process.exit(1);
  }
})();
