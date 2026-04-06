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
  }
  return (
    <button
      onClick={submitCode}
      disabled={isLoading}
      className="relative flex items-center gap-2 font-mono text-xs font-black px-5 py-2 rounded-lg overflow-hidden transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
    >