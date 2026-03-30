import problemsModel from "../models/problems.model.js";

const getAllproblems = async (req, res) => {
  try {
    const allproblems = await problemsModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allproblems });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const addProblem = async (req, res) => {
  try {
    const {
      title,
      functionName,
      description,
      difficulty,
      tags,
      constraints,
      examples,
      testCases,
      solutions,
      points,
    } = req.body;

    if (!title || !functionName || !testCases || testCases.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Title, Function Name, and at least one Test Case are required.",
      });
    }

    const newProblem = await problemsModel.create({
      title,
      functionName,
      description,
      difficulty,
      tags,
      constraints,
      examples, // Array of { input, output, explanation }
      testCases, // Array of { input: Object, expectedOutput: Object }
      solutions, // Array of { language, code }
      points,
    });

    return res.status(201).json({
      success: true,
      message: "New problem created successfully!",
      problemId: newProblem._id,
    });
  } catch (err) {
    // Handle Duplicate Title (Unique constraint)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Problem title already exists." });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProblem = await problemsModel.findByIdAndUpdate(id, req.body);

    if (!updatedProblem)
      return res.status(404).json({ message: "Problem not found." });

    return res.status(200).json({ success: true, data: updatedProblem });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 3. DELETE: Remove a problem completely
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await problemsModel.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Problem not found." });

    return res
      .status(200)
      .json({ success: true, message: "Problem deleted from platform." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getAllproblems, addProblem, updateProblem, deleteProblem };
