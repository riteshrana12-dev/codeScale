import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/api.js";
import CodeEditor from "../components/codeEditor/CodeEditor"; // Your existing component
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
  const navigate = useNavigate();
  const { setSolution, setSubmissionResult } = useProblem();
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const response = await api.get(`/problems/${slug}`);
        // console.log(response.data.data);
        setProblem(response.data.data);
      } catch (err) {
        console.log("Error fetching problem:", err);
        if (err?.response.status === 403) {
          navigate("/signIn");
        }
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
      {/* Top Bar */}
      <div className="h-12 bg-[#0d0d1a] border-b border-white/5 flex items-center px-4 gap-4 flex-shrink-0">
        <Link to={"/problems"} className="flex items-center gap-2">
          <span className="font-mono text-[#00ff9d] font-bold text-sm">
            &gt;_
          </span>
          <span className="font-mono text-white text-sm font-semibold">
            CodeScale
          </span>
        </Link>
        <div className="w-px h-4 bg-white/10" />
        <span className="font-semibold text-xs text-[#626282] truncate max-w-xs">
          {problem.title}
        </span>
        <div
          className="ml-auto font-mono text-xs px-2.5 py-1 rounded-full border"
          style={{
            color: diff.color,
            background: diff.bg,
            borderColor: diff.border,
          }}
        >
          {problem.difficulty}
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Content */}
        <div className="w-[45%] min-w-[340px] flex flex-col border-r border-white/5 overflow-hidden">
          <ProblemDescription problem={problem} />
        </div>

        {/* RIGHT: Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CodeEditor testCase={problem.testCase} />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
