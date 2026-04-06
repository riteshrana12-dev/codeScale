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