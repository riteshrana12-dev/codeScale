import problemsModel from "../models/problems.model.js";
import submissionModel from "../models/submission.model.js";
import getWrapper from "../utils/template.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import userModel from "../models/user.model.js";
import updateStreakAndStats from "../utils/user_statsHelper.js";

const submissionProblem = async (req, res) => {
  let tempFilePath = "";
  try {
    const { code, language } = req.body;

    // 1. Fetch the problem details from the database using the slug from the URL
    const problem = await problemsModel.findOne({ slug: req.params.slug });
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // 2. Determine the programming language and set the appropriate runner (Node or Python)
    const langLower = language.toLowerCase();
    const isPython = langLower.includes("python") || langLower === "py";

    let runner = "node";
    if (isPython) {
      try {
        // Check if 'python' command is available, otherwise fallback to 'py' (common on Windows)
        execSync("python --version", { stdio: "ignore" });
        runner = "python";
      } catch (e) {
        runner = "py";
      }
    }

    // 3. Create a temporary file path with the correct extension (.py or .cjs)
    const extension = isPython ? "py" : "cjs";
    tempFilePath = path.join(process.cwd(), `.temp_run.${extension}`);

    // 4. Wrap the user's code with a template that handles input/output and write it to the temp file
    fs.writeFileSync(
      tempFilePath,
      getWrapper(language, code, problem.functionName),
    );

    const results = [];
    let allPassed = true;

    // 5. Iterate through every test case stored in the problem model
    for (const tc of problem.testCases) {
      try {
        // Execute the code in a child process
        // 'input' is passed via stdin, 'timeout' prevents infinite loops
        const out = execSync(`"${runner}" "${tempFilePath}"`, {
          input: JSON.stringify(tc.input),
          timeout: 9000,
          encoding: "utf-8",
          shell: true,
        }).trim();

        // 6. Compare the actual output from the process with the expected output in the DB
        const userOutput = JSON.parse(out);
        const isCorrect =
          JSON.stringify(userOutput) === JSON.stringify(tc.expectedOutput);

        results.push({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          output: out,
          status: isCorrect ? "passed" : "failed",
        });

        // If any single test fails, the overall submission is not accepted
        if (!isCorrect) {
          allPassed = false;
        }
      } catch (err) {
        // 7. Handle runtime errors or timeouts
        allPassed = false;
        results.push({
          status: "error",
          output: err.stderr?.toString() || err.message,
        });
        // We do not 'break' here so we can see which specific cases failed or erroed
      }
    }

    // 8. If all test cases passed, update the user's solved problems list
    if (allPassed) {
      // FIXED: Used req.user_id instead of undefined 'userId'
      await userModel.findByIdAndUpdate(req.user_id, {
        $addToSet: { solvedproblems: problem._id },
      });
    }

    // 9. Clean up: Delete the temporary file from the server
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

    // 10. Record the submission attempt in the database
    const submission = await submissionModel.create({
      userId: req.user_id,
      problemId: problem._id,
      code,
      language,
      statue: allPassed
        ? "accepted"
        : results[results.length - 1].status === "error"
          ? "error"
          : "failed",
      testCaseResults: results,
    });

    // 11. Trigger external utility to update user stats (streaks, points, etc.)
    const user = await userModel.findById(req.user_id);
    if (allPassed) {
      await updateStreakAndStats(user, problem.difficulty, problem.points);
    } else {
      user.summary.totalSubmissions += 1;
    }

    // 12. Return the final results to the frontend
    return res.status(200).json({ success: true, submission });
  } catch (err) {
    // 13. Global error handling: Ensure temp files are deleted if an crash occurs
    if (tempFilePath && fs.existsSync(tempFilePath))
      fs.unlinkSync(tempFilePath);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default submissionProblem;
