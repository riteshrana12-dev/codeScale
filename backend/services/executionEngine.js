import getWrapper from "../utils/template.js";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export default async function executionEngine(code, language, problem) {
  let tempFilePath = "";
  try {
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

    const extension = isPython ? "py" : "cjs";
    // Using a unique filename per request prevents collisions if two users run code at once
    const uniqueId = Date.now() + Math.random().toString(36).substring(7);
    tempFilePath = path.join(process.cwd(), `.temp_${uniqueId}.${extension}`);
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
          // Prevent the child process from seeing your server's environment variables
          env: { PATH: process.env.PATH },
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
          output:
            err.status === "ETIMEDOUT"
              ? "Time Limit Exceeded"
              : err.stderr?.toString() || err.message,
        });
        // We do not 'break' here so we can see which specific cases failed or erroed
      }
    }

    return {
      allPassed,
      results,
    };
  } catch (err) {
    console.error("Execution Engine Crash:", err);
    throw new Error("Execution failed: " + err.message);
  } finally {
    // 9. Clean up: Delete the temporary file from the server
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (e) {
        console.error("Failed to delete temp file:", e);
      }
    }
  }
}
