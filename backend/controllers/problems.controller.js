import problemsModel from "../models/problems.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const problemsList = async (req, res) => {
  try {
    const problems = await problemsModel.find(req.body);
    res.status(201).json({
      message: "Problems",
      problems,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

const problems = async (req, res) => {
  try {
    const problems = await problemsModel
      .findById(req.params.id)
      .select("-testCases -solutions");

    if (!problems) {
      return res.status(400).json({
        message: "Question not Available",
      });
    }

    return res.status(201).json({
      problems,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

export default { problemsList, problems };
