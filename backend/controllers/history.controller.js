import submissionModel from "../models/submission.model";

const getSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user_id;
    const history = await submissionModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate("problemId", "title difficulty");

    if (!history || history.length === 0) {
      return res.json(200).json({
        success: true,
        message: "No submission found yet. Start coding!",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "submission history",
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
