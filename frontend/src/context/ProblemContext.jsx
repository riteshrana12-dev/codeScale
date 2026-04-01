// ProblemContext.js
import { createContext, useContext, useState } from "react";

const ProblemContext = createContext();
export const useProblem = () => useContext(ProblemContext);

export const ProblemProvider = ({ children }) => {
  const [solution, setSolution] = useState({
    language: "JavaScript",
    code: "",
  });
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const value = {
    solution,
    setSolution,
    submissionResult,
    setSubmissionResult,
    isLoading,
    setIsLoading,
  };
  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
};
