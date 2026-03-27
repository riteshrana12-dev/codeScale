import submissionModel from "../models/submission.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
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
    const user = await userModel
      .findById(userId)
      .select("firstName lastname summary activity -_id");

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
      profile: {
        name: `${user.firstName} ${user.lastName}`,
        joinedAt: user.activity.joinedDate,
      },
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

export default { userProfile, getUserDashboard };
