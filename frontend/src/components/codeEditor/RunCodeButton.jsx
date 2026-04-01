import { useProblem } from "../../context/ProblemContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";
const RunCodeButton = () => {
  const { slug } = useParams();
  const { solution, setSubmissionResult, setIsLoading, isLoading } =
    useProblem();

  async function runCode() {
    setIsLoading(true); // Start the loading spinner/state
    setSubmissionResult(null); // Clear previous results
    try {
      const response = await api.post(`/submission/${slug}/submit`, solution);
      setSubmissionResult(response.data);
    } catch (err) {
      setSubmissionResult({ status: "error", message: err.message });
    } finally {
      setIsLoading(false); // Stop the loading state regardless of success or failure
    }
  }

  return (
    <button
      onClick={runCode}
      disabled={isLoading} // Prevent double clicks
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      {isLoading ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunCodeButton;
