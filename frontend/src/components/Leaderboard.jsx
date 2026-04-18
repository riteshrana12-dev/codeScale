import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api.js";

const RANK_CONFIG = {
  1: {
    color: "#facc15",
    glow: "rgba(250,204,21,0.4)",
    bg: "rgba(250,204,21,0.08)",
    label: "1st",
    crown: true,
  },
  2: {
    color: "#c0c0c0",
    glow: "rgba(192,192,192,0.3)",
    bg: "rgba(192,192,192,0.06)",
    label: "2nd",
    crown: false,
  },
  3: {
    color: "#cd7f32",
    glow: "rgba(205,127,50,0.35)",
    bg: "rgba(205,127,50,0.07)",
    label: "3rd",
    crown: false,
  },
};

function Avatar({ user, size = 36 }) {
  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
    "?";

  if (user.profile?.avatar) {
    return (
      <img
        src={`${import.meta.env.VITE_API_URL}${user.profile.avatar}`}
        alt={initials}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  // generate a consistent hue from name
  const hue = ((user.firstName?.charCodeAt(0) || 65) * 37) % 360;
  return (
    <div
      className="rounded-full flex items-center justify-center font-mono font-black flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `hsl(${hue}, 60%, 18%)`,
        border: `1.5px solid hsl(${hue}, 60%, 30%)`,
        color: `hsl(${hue}, 80%, 65%)`,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}

function RankMedal({ rank }) {
  const cfg = RANK_CONFIG[rank];
  if (!cfg)
    return (
      <span className="font-mono text-xs text-[#444460] w-8 text-center font-bold">
        #{rank}
      </span>
    );
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.color}40`,
        boxShadow: `0 0 10px ${cfg.glow}`,
      }}
    >
      <span
        className="font-mono text-xs font-black"
        style={{ color: cfg.color }}
      >
        {rank}
      </span>
    </div>
  );
}

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get("/analytics/leaderboard");
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const maxPoints = users.length > 0 ? users[0]?.summary?.totalPoints || 1 : 1;

  if (loading) {
    return (
      <div className="bg-[#0d0d1a] border border-white/5 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <div className="h-4 w-28 bg-white/5 rounded animate-pulse" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.04]"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            <div className="flex-1 h-3 bg-white/5 rounded animate-pulse" />
            <div className="w-16 h-3 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-[#0d0d1a] border border-white/5 rounded-xl overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#facc15]/35 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div>
          <p className="font-mono text-[15px] text-[#7b7b95] tracking-widest uppercase">
            Rankings
          </p>
          <p className="font-mono text-[23px] text-white font-bold text-base mt-0.5">
            Leaderboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#facc15]/8 border border-[#facc15]/15 flex items-center justify-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="font-mono text-s text-[#656581]">
            Top {users.length}
          </span>
        </div>
      </div>
      {/* ── Top 3 podium ── */}
      {users.length >= 3 && (
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-end justify-center gap-3">
            {/* 2nd place */}
            {[users[1], users[0], users[2]].map((user, podiumIdx) => {
              const rank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
              const cfg = RANK_CONFIG[rank];
              const height = rank === 1 ? 88 : rank === 2 ? 68 : 56;
              const pts = user?.summary?.totalPoints || 0;
          return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: podiumIdx * 0.1 }}
                  className="flex flex-col items-center gap-2 flex-1"
                  style={{ maxWidth: 120 }}
                >
                  {/* Crown for 1st */}
                  {rank === 1 && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 31 20"
                        fill="#facc15"
                      >
                        <path d="M2 19h20M2 19L5 7l7 6 5-10 5 10 7-6 3 12H2z" />
                      </svg>
                    </motion.div>
                  )}
                  <Avatar user={user} size={rank === 1 ? 44 : 36} />

                  <p className="font-mono text-s text-white font-bold text-center truncate w-full px-1">
                    {user.firstName} {user.lastName}
                  </p>
                  <p
                    className="font-mono text-s font-black"
                    style={{ color: cfg.color }}
                  >
                    {pts} pts
                  </p>

                  {/* Podium block */}
                  <div
                    className="w-full rounded-t-lg flex items-center justify-center"
                    style={{
                      height,
                      background: cfg.bg,
                      border: `1px solid ${cfg.color}25`,
                    }}
                  >
                    <span
                      className="font-mono text-3xl font-black"
                      style={{ color: cfg.color }}
                    >
                      {rank}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      {/* ── Ranked list (4th onwards + all if < 3) ── */}
      <div>
        {users.slice(3).map((user, i) => {
          const rank = i + 4;
          const pts = user?.summary?.totalPoints || 0;
          const pct = maxPoints > 0 ? (pts / maxPoints) * 100 : 0;

          return (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
              className="flex items-center gap-4 px-6 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group"
            >
              <RankMedal rank={rank} />
              <Avatar user={user} size={34} />

              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-[#9999b0] group-hover:text-white transition-colors truncate">
                  {user.firstName} {user.lastName}
                </p>
                {/* Points bar */}
                <div className="mt-1.5 h-1 bg-[#1a1a2e] rounded-full overflow-hidden w-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full bg-[#00ff9d]/60"
                    style={{ minWidth: pts > 0 ? 4 : 0 }}
                  />
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-mono text-sm font-black text-white">{pts}</p>
                <p className="font-mono text-[9px] text-[#444460]">pts</p>
              </div>
            </motion.div>
          );
        })}