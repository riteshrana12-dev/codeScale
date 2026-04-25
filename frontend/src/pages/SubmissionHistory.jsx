import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

const STATUS_CONFIG = {
  accepted: {
    label: "Accepted",
    color: "#00ff9d",
    bg: "rgba(0,255,157,0.08)",
    border: "rgba(0,255,157,0.2)",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  wrong_answer: {
    label: "Wrong Answer",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  time_limit_exceeded: {
    label: "TLE",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  runtime_error: {
    label: "Runtime Error",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  compile_error: {
    label: "Compile Error",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    icon: (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
};

const FALLBACK_STATUS = {
  label: "Attempted",
  color: "#8888a0",
  bg: "rgba(136,136,160,0.08)",
  border: "rgba(136,136,160,0.15)",
  icon: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};
const DIFF_COLOR = { Easy: "#00ff9d", Medium: "#facc15", Hard: "#f87171" };

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchSubmissions = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`/user/history?page=${page}&limit=10`);
      setSubmissions(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#05050a] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5d5d7d]">
              Submission History
            </h1>
            <p className="text-[#5d5d7d] font-mono text-sm mt-1">
              Track your progress and review past solutions
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

          {loading ? (
            <div className="divide-y divide-white/[0.04]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/4 bg-white/5 rounded" />
                    <div className="h-3 w-1/6 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : submissions.length === 0 ? ( <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333350" strokeWidth="1.5">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              </div>
              <p className="text-[#5d5d7d] font-mono">No submissions found.</p>
            </div>

            <div className="divide-y divide-white/[0.04]">
              <AnimatePresence mode="wait">
                {submissions.map((sub, i) => {
                  const statusKey = (sub.submissionStatus || "")
                    .toLowerCase()
                    .replace(/ /g, "_");
                  const statusCfg = STATUS_CONFIG[statusKey] || FALLBACK_STATUS;
                  const difficulty = sub.problemId?.difficulty;

                  return (
                    <motion.div
                      key={sub._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => navigate(`/submissiondetailveiw/${sub._id}`)}
                      className="group flex items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105"
                        style={{ background: statusCfg.bg, borderColor: statusCfg.border, color: statusCfg.color }}>
                        {statusCfg.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#ccccdd] group-hover:text-white transition-colors truncate">
                          {sub.problemId?.title || "Unknown Problem"}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm font-mono">
                          <span style={{ color: DIFF_COLOR[difficulty] }}>{difficulty}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[#787883]">{sub.language}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[#787883]">{timeAgo(sub.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="hidden sm:block font-mono text-[11px] font-bold px-3 py-1 rounded-full border"
                          style={{ color: statusCfg.color, background: statusCfg.bg, borderColor: statusCfg.border }}>
                          {statusCfg.label}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333350" strokeWidth="2" className="group-hover:stroke-[#00d4ff] group-hover:translate-x-1 transition-all">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-mono text-sm border transition-all ${
                      currentPage === i + 1 ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.2)]" : "border-white/5 bg-white/[0.02] text-[#5d5d7d] hover:border-white/20"
                    }`}>
                    {i + 1}
                  </button>
                ))}
              </div>

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
            <p className="text-[#5d5d7d] font-mono text-xs italic">Page {currentPage} of {totalPages}</p>
          </div>
        )}
      </div>
    </div>
  );
};