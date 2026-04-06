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