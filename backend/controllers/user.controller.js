import submissionModel from "../models/submission.model.js";
import mongoose from "mongoose";
//profile
const userProfile = (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

// dashboard
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user_id;

    const userStats = await submissionModel.aggregate([
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
      statsData: userStats,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

export default { userProfile, getUserDashboard };
