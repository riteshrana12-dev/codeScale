import { useProblem } from "../../context/ProblemContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const RunCodeButton = () => {
  const { slug } = useParams();

  const {
    solution,
    setSubmissionResult,
    setIsLoading,
    isLoading,
    setSubmittedResult,
  } = useProblem();

  async function runCode() {
    setIsLoading(true);
    setSubmittedResult(false);