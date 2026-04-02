import problemsModel from "../models/problems.model.js";
import submissionModel from "../models/submission.model.js";

import userModel from "../models/user.model.js";
import updateStreakAndStats from "../utils/user_statsHelper.js";
import executionEngine from "../services/executionEngine.js";

const submissionProblem = async (req, res) => {
  try {
    const { code, language } = req.body;
    // 1. Fetch the problem details from the database using the slug from the URL
    const problem = await problemsModel.findOne({ slug: req.params.slug });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    const output = await executionEngine(code, language, problem);
    console.log(output);
    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const problem = await problemsModel.findOne({ slug: req.params.slug });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    const output = await executionEngine(code, language, problem);

    const submission = await submissionModel.create({
      userId: req.user_id,
      problemId: problem._id,
      code,
      language,
      status: finalStatus, // Fixed typo from 'statue'
      testCaseResults: output.results,
    });
    if (output.allPassed) {
      const user = await userModel.findById(req.user_id);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      await updateStreakAndStats(user, problem.difficulty, problem.points);

      return res.status(200).json({ success: true, submission });
    }
    await userModel.findByIdAndUpdate(req.user_id, {
      $inc: { "summary.totalSubmissions": 1 },
    });

    return res
      .status(200)
      .json({ success: false, message: "Wrong Submission", submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { submissionProblem, submitCode };
