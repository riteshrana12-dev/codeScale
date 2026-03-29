import submissionModel from "../models/submission.model.js";

const getSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user_id;

    // 1. Find submissions for this user
    // 2. Sort by 'createdAt' so the newest ones are at the top
    // 3. .populate('problemId', 'title difficulty') joins the Problem data
    const history = await submissionModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate("problemId", "title difficulty");

    if (!history || history.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No submission found yet. Start coding!",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "submission history",
      count: history.length,
      data: history,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: err.message,
    });
  }
};

export default getSubmissionHistory;
