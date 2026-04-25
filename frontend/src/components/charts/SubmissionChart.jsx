import { motion } from "framer-motion";

const STATUS_META = {
  accepted: { label: "Accepted", color: "#00ff9d", bg: "rgba(0,255,157,0.08)" },
  wrong_answer: {
    label: "Wrong Answer",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
  },
  time_limit_exceeded: {
    label: "TLE",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
  },
  runtime_error: {
    label: "Runtime Err",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
  },
  compile_error: {
    label: "Compile Err",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
  },
};

const FALLBACK = {
  label: "Other",
  color: "#666680",
  bg: "rgba(102,102,128,0.08)",
};

const SubmissionChart = ({ submissionRaw }) => {
  if (!submissionRaw?.length) return null;

  const total = submissionRaw.reduce((s, r) => s + r.count, 0);
  const maxCount = Math.max(...submissionRaw.map((r) => r.count), 1);

  // Sort: accepted first, then by count desc
  const sorted = [...submissionRaw].sort((a, b) => {
    if (a._id === "accepted") return -1;
    if (b._id === "accepted") return 1;
    return b.count - a.count;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#0d0d1a] border border-white/5 rounded-xl p-6"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-[#60a5fa]/20 to-transparent mb-5" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-mono text-[11px] text-[#444460] uppercase tracking-widest">
            Breakdown
          </p>
          <p className="font-mono text-lg font-bold text-white mt-0.5">
            Submission Results
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-black text-white">{total}</p>
          <p className="font-mono text-[10px] text-[#444460]">total</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-3">
        {sorted.map((row, i) => {
          const key = row._id?.toLowerCase().replace(/ /g, "_");
          const meta = STATUS_META[key] || FALLBACK;
          const pct = (row.count / maxCount) * 100;
          const sharePct = ((row.count / total) * 100).toFixed(1);

          return (
            <div key={row._id} className="flex items-center gap-3">
              {/* label */}
              <div className="w-24 flex-shrink-0">
                <span
                  className="font-mono text-[11px]"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </span>
              </div>
              {/* bar */}
              <div className="flex-1 h-6 bg-[#0a0a15] rounded-md overflow-hidden border border-white/[0.04] relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-md flex items-center justify-end pr-2"
                  style={{
                    background: meta.bg,
                    borderRight: `2px solid ${meta.color}`,
                  }}
                >
                  {pct > 20 && (
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: meta.color }}
                    >
                      {sharePct}%
                    </span>
                  )}
                </motion.div>
                {pct <= 20 && (
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold"
                    style={{ color: meta.color }}
                  >
                    {sharePct}%
                  </span>
                )}
              </div>
              {/* count */}
              <div className="w-8 text-right flex-shrink-0">
                <span className="font-mono text-sm font-black text-white">
                  {row.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* acceptance highlight */}
      {(() => {
        const acc = submissionRaw.find((r) => r._id === "accepted");
        if (!acc) return null;
        const pct = ((acc.count / total) * 100).toFixed(1);
        return (
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" />
            <span className="font-mono text-xs text-[#555575]">
              Acceptance rate:{" "}
              <span className="text-[#00ff9d] font-bold">{pct}%</span>
            </span>
          </div>
        );
      })()}
    </motion.div>
  );
};

export default SubmissionChart;
