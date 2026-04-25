import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api.js";

// ── Build a full 52-week grid from today backwards ──────────────────────────
function buildWeeks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // go back to the most recent Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - 51 * 7);

  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      week.push(date);
    }
    weeks.push(week);
  }
  return { weeks, today };
}

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function buildMap(data) {
  const map = {};
  (data || []).forEach(({ date, totalSubmission }) => {
    map[date] = totalSubmission;
  });
  return map;
}

// ── Color levels: 0 = empty, 1-4 = intensity ────────────────────────────────
const LEVELS = [
  { min: 0, max: 0, bg: "#0f0f1e", border: "#1A3263" },
  { min: 1, max: 2, bg: "#065f36", border: "#065f36" },
  { min: 3, max: 5, bg: "#047857", border: "#047857" },
  { min: 6, max: 9, bg: "#00c974", border: "#00c974" },
  { min: 10, max: Infinity, bg: "#00ff9d", border: "#00ff9d" },
];

function getLevel(count) {
  return LEVELS.findIndex((l) => count >= l.min && count <= l.max);
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// ── Component ────────────────────────────────────────────────────────────────
const ActivityMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null); // { date, count, x, y }

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get("/analytics/heatmap");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const { weeks, today } = buildWeeks();
  const activityMap = buildMap(data);

  // Build month label positions
  const monthLabels = [];
  weeks.forEach((week, wi) => {
    const first = week[0];
    if (first.getDate() <= 7) {
      monthLabels.push({ label: MONTH_LABELS[first.getMonth()], col: wi });
    }
  });

  if (loading) {
    return (
      <div className="bg-[#151527] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className="w-3 h-3 rounded-sm bg-white/[0.03] animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0d0d1a] border border-white/5 rounded-xl p-6 relative"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-1">
        <p className="font-mono font-bold text-[15px] text-[#ffffff] tracking-widest uppercase">
          Activity
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div style={{ minWidth: 52 * 14 + 52 * 2 + 24 }}>
          {/* Month labels */}
          <div className="flex mb-1 pl-6">
            {weeks.map((week, wi) => {
              const ml = monthLabels.find((m) => m.col === wi);
              return (
                <div
                  key={wi}
                  style={{ width: 14, marginRight: 2, flexShrink: 0 }}
                >
                  {ml && (
                    <span className="font-mono font-bold text-[10px] text-[#8f8faa] whitespace-nowrap">
                      {ml.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-2 flex-shrink-0">
              {DAY_LABELS.map((d, i) => (
                <div key={i} style={{ height: 14, lineHeight: "14px" }}>
                  <span className="font-mono font-bold text-[10px] text-[#8f8faa]">
                    {d}
                  </span>
                </div>
              ))}
            </div>

            {/* Weeks grid */}
            <div className="flex gap-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((date, di) => {
                    const key = toKey(date);
                    const count = activityMap[key] || 0;
                    const level = getLevel(count);
                    const cfg = LEVELS[level];
                    const isFuture = date > today;
                    const isToday = toKey(date) === toKey(today);
                    return (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: wi * 0.004 + di * 0.002,
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.target.getBoundingClientRect();
                          setTooltip({
                            date: key,
                            count,
                            x: rect.left,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        className="rounded-full cursor-default"
                        style={{
                          width: 14,
                          height: 14,
                          background: isFuture ? "transparent" : cfg.bg,
                          border: isToday
                            ? "1.5px solid #00ff9d"
                            : `1px solid ${isFuture ? "rgba(255,255,255,0.02)" : cfg.border}`,
                          opacity: isFuture ? 0.15 : 1,
                          flexShrink: 0,
                          transition: "transform 0.1s",
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="font-mono text-[9px] text-[#333350]">Less</span>
            {LEVELS.map((l, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: l.bg,
                  border: `1px solid ${l.border}`,
                }}
              />
            ))}
            <span className="font-mono text-[9px] text-[#333350]">More</span>
          </div>
        </div>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x + 18, top: tooltip.y - 36 }}
        >
          <div className="bg-[#111128] border border-white/10 rounded-lg px-2.5 py-1.5 shadow-xl">
            <p className="font-mono text-xs text-white font-bold">
              {tooltip.count > 0
                ? `${tooltip.count} submission${tooltip.count !== 1 ? "s" : ""}`
                : "No submissions"}
            </p>
            <p className="font-mono font-bold  text-[12px] text-[#84849f]">
              {tooltip.date}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ActivityMap;
