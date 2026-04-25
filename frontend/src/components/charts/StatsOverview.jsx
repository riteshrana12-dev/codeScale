import { motion } from "framer-motion";

// ── Donut chart for solved problems by difficulty ────────────────────────────
function DonutChart({ easy, medium, hard, total }) {
  const size = 120;
  const strokeW = 10;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;

  const easyPct = total > 0 ? easy / total : 0;
  const medPct = total > 0 ? medium / total : 0;
  const hardPct = total > 0 ? hard / total : 0;

  const segments = [
    { pct: easyPct, color: "#00ff9d", label: "Easy" },
    { pct: medPct, color: "#facc15", label: "Medium" },
    { pct: hardPct, color: "#f87171", label: "Hard" },
  ];

  let cumOffset = 0;
  const arcs = segments.map((seg) => {
    const dash = seg.pct * circ;
    const gap = circ - dash;
    const rotation = cumOffset * 360 - 90;
    cumOffset += seg.pct;
    return { ...seg, dash, gap, rotation };
  });

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(0deg)" }}>
        {/* bg track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a1a2e"
          strokeWidth={strokeW}
        />
        {arcs.map((arc, i) =>
          arc.pct > 0 ? (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeW}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeLinecap="round"
              style={{
                transform: `rotate(${arc.rotation}deg)`,
                transformOrigin: "50% 50%",
              }}
            />
          ) : null,
        )}
      </svg>
      {/* centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-black text-white leading-none">
          {total}
        </span>
        <span className="font-mono text-[10px] text-[#555575] mt-0.5">
          solved
        </span>
      </div>
    </div>
  );
}

// ── Thin radial gauge for acceptance rate ───────────────────────────────────
function GaugeBar({ value, max = 100, color, label, sub }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[11px] text-[#555575] uppercase tracking-widest">
          {label}
        </span>
        <span className="font-mono text-sm font-black" style={{ color }}>
          {sub}
        </span>
      </div>
      <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ── Flame streak widget ──────────────────────────────────────────────────────
function StreakBadge({ streak, maxStreak }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-4 bg-[#110e0a] border border-[#f97316]/15 rounded-xl">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl leading-none"
      >
        🔥
      </motion.div>
      <span className="font-mono text-3xl font-black text-[#f97316] leading-none">
        {streak}
      </span>
      <span className="font-mono text-[10px] text-[#5a4030] uppercase tracking-widest">
        day streak
      </span>
      <div className="mt-1 px-2 py-0.5 rounded-full bg-[#1a1208] border border-[#f97316]/10">
        <span className="font-mono text-[10px] text-[#a06040]">
          best {maxStreak}d
        </span>
      </div>
    </div>
  );
}

const StatsOverview = ({ dashboard }) => {
  if (!dashboard) return null;

  const { points, activity } = dashboard;
  const {
    easySolved,
    mediumSolved,
    hardSolved,
    totalSolved,
    totalSubmissions,
    easyPoints,
    mediumPoints,
    hardPoints,
    totalPoints,
  } = points;
  const { streak, maxStreak } = activity;

  const acceptance =
    totalSubmissions > 0
      ? Math.min(
          ((dashboard.submissionRaw?.find((s) => s._id === "accepted")?.count ||
            0) /
            totalSubmissions) *
            100,
          100,
        )
      : 0;

  const diffStats = [
    { label: "Easy", solved: easySolved, pts: easyPoints, color: "#00ff9d" },
    {
      label: "Medium",
      solved: mediumSolved,
      pts: mediumPoints,
      color: "#facc15",
    },
    { label: "Hard", solved: hardSolved, pts: hardPoints, color: "#f87171" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* ── Card 1: Solved breakdown ── */}
      <div className="lg:col-span-2 bg-[#0d0d1a] border border-white/5 rounded-xl p-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00ff9d]/20 to-transparent mb-5" />
        <div className="flex gap-6 items-center">
          <DonutChart
            easy={easySolved}
            medium={mediumSolved}
            hard={hardSolved}
            total={totalSolved}
          />
          <div className="flex-1 flex flex-col gap-4">
            {diffStats.map(({ label, solved, pts, color }) => (
              <GaugeBar
                key={label}
                value={solved}
                max={Math.max(totalSolved, 1)}
                color={color}
                label={label}
                sub={`${solved} · ${pts}pts`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Card 2: Points + Streak ── */}
      <div className="flex flex-col gap-4">
        {/* Total Points */}
        <div className="bg-[#0d0d1a] border border-white/5 rounded-xl p-5 flex-1 flex flex-col justify-between">
          <div className="h-px bg-gradient-to-r from-transparent via-[#a78bfa]/25 to-transparent mb-4" />
          <div>
            <p className="font-mono text-[11px] text-[#444460] uppercase tracking-widest mb-1">
              Total Points
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-4xl font-black text-white leading-none"
            >
              {totalPoints.toLocaleString()}
            </motion.p>
            <p className="font-mono text-[11px] text-[#a78bfa] mt-1">
              pts earned
            </p>
          </div>
          {/* mini breakdown */}
          <div className="mt-4 flex gap-2">
            {diffStats.map(({ label, pts, color }) => (
              <div
                key={label}
                className="flex-1 rounded-lg bg-[#0a0a15] border border-white/[0.04] px-2 py-2 text-center"
              >
                <p className="font-mono text-xs font-black" style={{ color }}>
                  {pts}
                </p>
                <p className="font-mono text-[9px] text-[#333350]">
                  {label[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Streak */}
        <StreakBadge streak={streak} maxStreak={maxStreak} />
      </div>
    </motion.div>
  );
};

export default StatsOverview;
