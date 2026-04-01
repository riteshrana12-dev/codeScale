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
      style={{
        marginTop: 12,
        padding: "10px 28px",
        background: "#0e7a0e",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontSize: 14,
        fontFamily: "monospace",
        cursor: "pointer",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        transition: "background 0.2s",
      }}
      onMouseOver={(e) => (e.target.style.background = "#12a012")}
      onMouseOut={(e) => (e.target.style.background = "#0e7a0e")}
      onClick={runCode}
      disabled={isLoading} // Prevent double clicks
    >
      {isLoading ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunCodeButton;
