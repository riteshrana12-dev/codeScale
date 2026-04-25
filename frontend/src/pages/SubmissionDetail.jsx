import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api.js";

const STATUS_CONFIG = {
  accepted: {
    label: "Accepted",
    color: "#00ff9d",
    bg: "rgba(0,255,157,0.08)",
    border: "rgba(0,255,157,0.2)",
  },
  wrong_answer: {
    label: "Wrong Answer",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
};

const SubmissionsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/user/history/detailview/${id}`);
        setSubmission(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#05050a]" />;

  return (
    <div className="min-h-screen bg-[#05050a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-mono text-[#5d5d7d] hover:text-[#00d4ff] transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to History
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Top Info Bar */}
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-300 tracking-tight">
                {submission.problemId?.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-[#5d5d7d]">
                <span className="text-[#00d4ff]">{submission.language}</span>
                <span>•</span>
                <span>{new Date(submission.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="px-4 py-1.5 rounded-lg border border-[#00ff9d]/30 bg-[#00ff9d]/5 text-[#00ff9d] font-mono text-sm font-bold">
              {submission.submissionStatus}
            </div>
          </div>
          {/* CODE CONTAINER - This is the fix for the "blur" */}
          <div className="relative bg-[#000000]">
            {" "}
            {/* Solid black for maximum contrast */}
            {/* Header / Copy Button */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              <span className="text-[10px] uppercase tracking-widest text-[#5d5d7d] font-bold">
                Source Code
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(submission.code)}
                className="text-[10px] text-[#00d4ff] active:brightness-125 font-bold uppercase tracking-tighter"
              >
                Copy
              </button>
            </div>