import problemsModel from "../models/problems.model.js";
import submissionModel from "../models/submission.model.js";
import getWrapper from "../utils/template.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const submissionProblem = async (req, res) => {
  let tempFilePath = "";
  try {
    const { code, language } = req.body;
    const problem = await problemsModel.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const langLower = language.toLowerCase();
    const isPython = langLower.includes("python") || langLower === "py";

    // Windows ke liye check: 'python' command ya 'py' command
    let runner = "node";
    if (isPython) {
      try {
        execSync("python --version", { stdio: "ignore" });
        runner = "python";
      } catch (e) {
        runner = "py"; // Agar python command na mile toh 'py' try kare
      }
    }

    const extension = isPython ? "py" : "cjs";
    tempFilePath = path.join(process.cwd(), `.temp_run.${extension}`);

    fs.writeFileSync(
      tempFilePath,
      getWrapper(language, code, problem.functionName),
    );

    const results = [];
    let allPassed = true;

    for (const tc of problem.testCases) {
      try {
        const out = execSync(`"${runner}" "${tempFilePath}"`, {
          input: JSON.stringify(tc.input),
          timeout: 5000,
          encoding: "utf-8",
          shell: true,
        }).trim();

        const userOutput = JSON.parse(out);
        const isCorrect =
          JSON.stringify(userOutput) === JSON.stringify(tc.expectedOutput);

        results.push({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          output: out,
          status: isCorrect ? "passed" : "failed",
        });

        if (!isCorrect) {
          allPassed = false;
          break;
        }
      } catch (err) {
        allPassed = false;
        results.push({
          status: "error",
          output: err.stderr?.toString() || err.message,
        });
        break;
      }
    }

    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

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

    return res.status(200).json({ success: true, submission });
  } catch (err) {
    if (tempFilePath && fs.existsSync(tempFilePath))
      fs.unlinkSync(tempFilePath);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default submissionProblem;
