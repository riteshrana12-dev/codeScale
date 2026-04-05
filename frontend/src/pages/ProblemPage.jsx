import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import CodeEditor from "../components/codeEditor/CodeEditor";
import ProblemDescription from "../components/codeEditor/ProblemDescription";

import { useProblem } from "../context/ProblemContext.jsx";
import { motion } from "framer-motion";

const difficultyConfig = {
  Easy: {
    color: "#00ff9d",
    bg: "rgba(0,255,157,0.08)",
    border: "rgba(0,255,157,0.2)",
  },
  Medium: {
    color: "#facc15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
  },
  Hard: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
};

const ProblemPage = () => {
  const { setSolution, setSubmissionResult } = useProblem();