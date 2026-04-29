import problemsModel from "../models/problems.model.js";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
dotenv.config({ path: "./config/.env" });

const problemsList = async (req, res) => {
  try {
    const { difficulty, tags } = req.query;
    const filter = {};

    if (difficulty) filter.difficulty = difficulty;

    if (tags) filter.tags = { $all: tags.split(",") };

    const problems = await problemsModel
      .find(filter)
      .select("-testCases -solutions");

    let userId;
    if (req.cookies?.token) {
      try {
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.JWT_SECRET_USER,
        );
        userId = decoded.userId;
      } catch (err) {
        console.error("JWT verification failed:", err);
        userId = null; // Treat as guest if token is invalid
      }
    }

    console.log(
      userId
        ? `Logged in user ID: ${userId}`
        : "No user logged in, treating as guest.",
    );
    // 2. Handle Guests
    if (!userId) {
      const guestList = problems.map((p) => ({ ...p._doc, isSolved: false }));
      return res.status(200).json({ success: true, data: guestList });
    }

    // 4. If logged in, get the user's solved list
    const user = await userModel.findById(userId).select("solvedProblems");
    const solvedIds = user?.solvedProblems || [];

    console.log("SolvedProblems in DB:", user.solvedProblems);

    // 5. Compare IDs (convert to string for accurate matching)
    // pro conatin lot of data coming from db which contain metadata inside _doc object it contain the original and usefull data from problem extracting the _doc object
    const finalizedList = problems.map((prob) => ({
      ...prob._doc,
      isSolved: solvedIds.some((id) => id.toString() === prob._id.toString()),
    }));
    console.log("Finalized List with isSolved:", finalizedList);

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      data: finalizedList,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching problems",
      error: err.message,
    });
  }
};

const problemsSelect = async (req, res) => {
  try {
    const problems = await problemsModel
      .findOne({ slug: req.params.slug })
      .select("-testCases -solutions");

    if (!problems) {
      return res.status(400).json({
        message: "Question are not Available",
      });
    }

    const userId = req.user_id;
    let isSolved = false;
    if (userId) {
      const user = await userModel.findById(userId).select("solvedProblems");
      // check if this problem's ID is in user list
      isSolved =
        user?.solvedProblems?.some(
          (id) => id.toString() === problems._id.toString(),
        ) || false;
    }
    return res.status(200).json({
      success: true,
      data: {
        ...problems._doc,
        isSolved,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

const problemSearch = async (req, res) => {
  try {
    const { text } = req.query;
    const cleanText = text.trim();
    if (!cleanText) {
      return res
        .status(404)
        .json({ success: false, message: "No search term provided" });
    }

    // Build regex object with case-insensitive flag
    const regex = new RegExp(cleanText, "i");
    console.log("Regex built:", regex);

    const results = await problemsModel.find({ title: regex });

    return res.status(200).json({
      success: true,
      message: "Filtered search results",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching problems",
      error: err.message,
    });
  }
};

export default { problemsList, problemsSelect, problemSearch };
