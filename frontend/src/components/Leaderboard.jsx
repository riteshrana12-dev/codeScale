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