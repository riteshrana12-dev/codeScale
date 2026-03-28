import submissionModel from "../models/submission.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

// dashboard
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user_id;
    const user = await userModel
      .findById(userId)
      .select("summary activity -_id");

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const submissionStats = await submissionModel.aggregate([
      // filter by userId
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      //group by status (accepted , failed,pending,error)
      {
        $group: {
          _id: "$statue",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      points: user.summary, // Includes easyPoints, totalPoints, etc.
      activity: user.activity, // Includes streaks
      submissionRaw: submissionStats,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

// 2. The Heatmap: Daily activity counts for the last year
const getActivityHeatMap = async (req, res) => {
  try {
    const userId = req.user_id;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const heatMapData = await submissionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: oneYearAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%M-%D", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: { _id: 0, date: "$_id", totalSubmission: "$count" },
      },
    ]);
    res.status(200).json({ success: true, data: heatMapData });
  } catch (err) {
    return res.status(500).json({
      message: "HeatMap server error",
      error: err.message,
    });
  }
};

export default { getUserDashboard, getActivityHeatMap };
