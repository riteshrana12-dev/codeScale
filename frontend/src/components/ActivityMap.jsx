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