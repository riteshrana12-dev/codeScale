import submissionModel from "../models/submission.model.js";

const getSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user_id;

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    //  Validation: Ensure page/limit aren't negative or zero
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;
    // 1. Find submissions for this user
    // 2. Sort by 'createdAt' so the newest ones are at the top
    // 3. .populate('problemId', 'title difficulty') joins the Problem data
    // 4. .skip to skip some number of data
    // 5. .limit is to limit the data to get of fixed size
    const totalSubmissions = await submissionModel.countDocuments({ userId });

    const history = await submissionModel
      .find({ userId }, "-code -testCaseResults")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("problemId", "title difficulty slug");

    const totalPages = Math.ceil(totalSubmissions / limit);

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
      pagination: {
        totalSubmissions,
        totalPages,
        currentPage: page,
        limit,
      },
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
