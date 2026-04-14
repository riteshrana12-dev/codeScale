import { useEffect, useRef, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

const FEATURES = [
  {
    icon: "⌥",
    title: "Smart Editor",
    desc: "Monaco-powered code editor with syntax highlighting, auto-complete, and real-time error detection.",
    accent: "#00ff9d",
  },
  {
    icon: "⚡",
    title: "Instant Execution",
    desc: "Sandboxed JavaScript runtime evaluates your solution against hidden test cases in milliseconds.",
    accent: "#00d4ff",
  },
  {
    icon: "◈",
    title: "Curated Problems",
    desc: "Hand-picked challenges spanning arrays, trees, dynamic programming and more — filtered by tag or difficulty.",
    accent: "#a78bfa",
  },
  {
    icon: "◎",
    title: "Verdict System",
    desc: "Detailed feedback: AC, WA, TLE, RE, CE — know exactly where your solution breaks.",
    accent: "#fb923c",
  },
  {
    icon: "▸",
    title: "Progress Tracking",
    desc: "Your personal dashboard tracks solved problems, streaks, and submission history over time.",
    accent: "#f472b6",
  },
  {
    icon: "≋",
    title: "Leaderboard",
    desc: "Compete with others, climb the ranks, and see where you stand across the community.",
    accent: "#facc15",
  },
];
