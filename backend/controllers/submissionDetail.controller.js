// Add this to your existing controller file
import submissionModel from "../models/submission.model.js";

const getSubmissionViewById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from the URL

    const submission = await submissionModel
      .findById(id)
      .populate("problemId", "title difficulty slug description");

    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default getSubmissionViewById;
