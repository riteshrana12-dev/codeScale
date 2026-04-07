import { useProblem } from "../../context/ProblemContext";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const RunCodeButton = () => {
  const { slug } = useParams();