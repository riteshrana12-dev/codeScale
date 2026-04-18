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
