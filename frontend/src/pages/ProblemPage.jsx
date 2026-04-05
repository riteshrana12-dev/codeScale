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
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const response = await api.get(`/problems/${slug}`);
        setProblem(response.data.data);
      } catch (err) {
        console.log("Error fetching problem:", err);
      }
    }

    if (slug) fetchProblem();

    return () => {
      setSolution({ language: "JavaScript", code: "" });
      setSubmissionResult(null);
    };
  }, [slug, setSolution, setSubmissionResult]);

  if (!problem)
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full"
        />
      </div>
    );

    const diff = difficultyConfig[problem.difficulty] || difficultyConfig.Medium;

    return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0d0d1a] border-b border-white/5 flex items-center px-4 gap-4 flex-shrink-0">