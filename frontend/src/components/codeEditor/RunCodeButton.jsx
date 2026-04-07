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
    try {
      const response = await api.post(`/submission/${slug}/run-code`, solution);
      console.log(response.data);
      setSubmissionResult(response.data);
    } catch (err) {
      setSubmissionResult({ status: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={runCode}
      disabled={isLoading}
      className="flex items-center gap-2 font-mono text-xs font-bold px-4 py-2 rounded-lg border border-white/10 text-[#9999b0] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      {isLoading ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunCodeButton;
