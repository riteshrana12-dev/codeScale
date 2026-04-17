import { useProblem } from "../../context/ProblemContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const SubmitCodeButton = () => {
  const { slug } = useParams();
  const {
    solution,
    setSubmittedResult,
    setIsLoading,
    isLoading,
    setSubmissionResult,
    canSubmit,
    setCanSubmit,
  } = useProblem();

  async function submitCode() {
    setIsLoading(true);
    setSubmissionResult(null);

    try {
      const response = await api.post(`/submission/${slug}/submit`, solution);
      if (response.data.success) {
        setSubmittedResult(response.data.success);
      } else {
        setSubmittedResult(true);
      }
    } catch (err) {
      console.error("Submission failed to reach server", err);
    } finally {
      setIsLoading(false);
    }
    setCanSubmit(false);
  }
  return (
    <button
      onClick={submitCode}
      disabled={isLoading || !canSubmit}
      className="relative flex items-center gap-2 font-mono text-xs font-black px-5 py-2 rounded-lg overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
    >
      <div className="absolute inset-0 bg-[#00ff9d] group-hover:bg-[#00e88a] transition-colors duration-200" />
      <span className="relative z-10 flex items-center gap-2 text-[#0a0a0f]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {isLoading ? "Submitting..." : "Submit"}
      </span>
    </button>
  );
};

export default SubmitCodeButton;
