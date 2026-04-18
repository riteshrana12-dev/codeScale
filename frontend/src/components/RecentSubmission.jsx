import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const DIFF_COLOR = {
  Easy: "#00ff9d",
  Medium: "#facc15",
  Hard: "#f87171",
};

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

const RecentSubmissions = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSubmissionHistory() {
      try {
        const response = await api.get("/user/history");
        setHistory(response.data.data);
      } catch (err) {
        console.error("error fetching", err);
      } finally {
        setLoading(false);
      }
    }
    getSubmissionHistory();
  }, []);

  // show only latest 4
  const recent = Array.isArray(history) ? history.slice(0, 4) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-[#0d0d1a] border border-white/5 rounded-xl overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div>
          <p className="font-mono text-white text-[20px] font-bold text-base mt-0.5">
            Recent Submissions
          </p>
        </div>
        <button
          onClick={() => navigate("/submissions")}
          className="font-mono text-s text-[#5d5d7d] hover:text-[#00d4ff] transition-colors flex items-center gap-1.5 group"
        >
          View all
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:translate-x-0.5 transition-transform duration-150"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="divide-y divide-white/[0.04]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 bg-white/[0.04] rounded animate-pulse" />
                <div className="h-2.5 w-1/3 bg-white/[0.03] rounded animate-pulse" />
              </div>
              <div className="h-6 w-16 rounded-full bg-white/[0.04] animate-pulse" />
            </div>
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333350"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
          <p className="font-mono text-sm text-[#444460]">No submissions yet</p>
          <button
            onClick={() => navigate("/problems")}
            className="font-mono text-xs text-[#00ff9d] hover:underline"
          >
            Solve your first problem →
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {recent.map((submission, i) => {
            const statusKey = (submission.submissionStatus || "")
              .toLowerCase()
              .replace(/ /g, "_");
            const statusCfg = STATUS_CONFIG[statusKey] || FALLBACK_STATUS;
            const difficulty = submission.problemId?.difficulty;
            const diffColor = DIFF_COLOR[difficulty] || "#8888a0";
            const slug = submission.problemId?.slug;

            return (
              <motion.div
                key={submission._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.07 }}
                onClick={() => slug && navigate(`/problems/${slug}`)}
                className={`flex items-center gap-4 px-6 py-4 transition-colors duration-150 ${
                  slug ? "cursor-pointer hover:bg-white/[0.025] group" : ""
                }`}
              >
                {/* Status icon bubble */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: statusCfg.bg,
                    border: `1.5px solid ${statusCfg.border}`,
                    color: statusCfg.color,
                  }}
                >
                  {statusCfg.icon}
                </div>

                {/* Problem info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-mono text-s font-bold truncate transition-colors duration-150 ${
                      slug
                        ? "text-[#ccccdd] group-hover:text-white"
                        : "text-[#ccccdd]"
                    }`}
                  >
                    {submission.problemId?.title || "Unknown Problem"}
                  </p>
                  <div className="flex items-center gap-2 ">
                    {/* Difficulty */}
                    {difficulty && (
                      <span
                        className="font-mono text-[14px] font-bold"
                        style={{ color: diffColor }}
                      >
                        {difficulty}
                      </span>
                    )}
                    {difficulty && (
                      <span className="w-1 h-1 rounded-full bg-white/10 flex-shrink-0" />
                    )}
                    {/* Language */}
                    <span className="font-mono text-[14px] text-[#787883]">
                      {submission.language}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                    {/* Time */}
                    <span className="font-mono text-[14px] text-[#787883]">
                      {timeAgo(submission.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap"
                    style={{
                      color: statusCfg.color,
                      background: statusCfg.bg,
                      borderColor: statusCfg.border,
                    }}
                  >
                    {statusCfg.label}
                  </span>

                  {/* Arrow for clickable rows */}
                  {slug && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#333350"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="group-hover:stroke-[#666680] transition-colors flex-shrink-0"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Bottom accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/10 to-transparent" />
    </motion.div>
  );
};

export default RecentSubmissions;
