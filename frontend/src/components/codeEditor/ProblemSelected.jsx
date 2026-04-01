import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CodeEditor from "./CodeEditor";
import { useProblem } from "../../context/ProblemContext";
const ProblemSelected = () => {
  const { setSolution, setSubmissionResult } = useProblem();
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);

  async function problemFunction(slug) {
    try {
      const response = await api.get(`/problems/${slug}`);
      setProblem(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (slug) {
      problemFunction(slug);
    }
    return () => {
      setSolution({ language: "JavaScript", code: "" });
      setSubmissionResult(null);
    };
  }, [slug, setSolution, setSubmissionResult]);

  if (!problem) return <p>Loading problem...</p>;

  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {/* Problem Title */}
        <h2>{problem.title}</h2>

        {/* Description */}
        <p>{problem.description}</p>

        {/* Examples */}
        <h3>Example{problem.examples.length > 1 ? "s" : ""}:</h3>
        {problem.examples.map((exp) => (
          <div
            key={exp._id}
            style={{
              background: "#f9f9f9",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Input:</strong> {exp.input}
            </p>
            <p>
              <strong>Output:</strong> {exp.output}
            </p>
            {exp.explanation && (
              <p>
                <strong>Explanation:</strong> {exp.explanation}
              </p>
            )}
          </div>
        ))}

        {/* Constraints */}
        {problem.constraints.length > 0 && (
          <>
            <h3>Constraints:</h3>
            <ul>
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}

        {/* Difficulty and Tags */}
        <p>
          <strong>Difficulty:</strong> {problem.difficulty}
        </p>
        <p>
          <strong>Tags:</strong> {problem.tags.join(", ")}
        </p>
      </div>

      <CodeEditor testCase={problem.testCase} />
    </div>
  );
};

export default ProblemSelected;
