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

const DIFFICULTIES = [
  { label: "Easy", count: 10, color: "#00ff9d", bg: "rgba(0,255,157,0.08)" },
  { label: "Medium", count: 10, color: "#facc15", bg: "rgba(250,204,21,0.08)" },
  { label: "Hard", count: 10, color: "#f87171", bg: "rgba(248,113,113,0.08)" },
];

const TAGS = [
  "Array",
  "String",
  "DP",
  "Tree",
  "Graph",
  "Hash Map",
  "Binary Search",
  "Stack",
  "Sliding Window",
  "Backtracking",
];

const CODE_LINES = [
  {
    ln: "01",
    tokens: [
      { t: "function", c: "#569cd6" },
      { t: " twoSum", c: "#dcdcaa" },
      { t: "(nums, target) {", c: "#d4d4d4" },
    ],
  },
  {
    ln: "02",
    tokens: [
      { t: "  const", c: "#569cd6" },
      { t: " map", c: "#9cdcfe" },
      { t: " = ", c: "#d4d4d4" },
      { t: "new", c: "#569cd6" },
      { t: " Map();", c: "#d4d4d4" },
    ],
  },
  {
    ln: "03",
    tokens: [
      { t: "  for", c: "#c586c0" },
      { t: " (", c: "#d4d4d4" },
      { t: "let", c: "#569cd6" },
      { t: " i = ", c: "#d4d4d4" },
      { t: "0", c: "#b5cea8" },
      { t: "; i < nums.length; i++) {", c: "#d4d4d4" },
    ],
  },
  {
    ln: "04",
    tokens: [
      { t: "    const", c: "#569cd6" },
      { t: " comp", c: "#9cdcfe" },
      { t: " = target - nums[i];", c: "#d4d4d4" },
    ],
  },
  {
    ln: "05",
    tokens: [
      { t: "    if", c: "#c586c0" },
      { t: " (map.", c: "#d4d4d4" },
      { t: "has", c: "#dcdcaa" },
      { t: "(comp))", c: "#d4d4d4" },
    ],
  },
  {
    ln: "06",
    tokens: [
      { t: "      return", c: "#c586c0" },
      { t: " [map.", c: "#d4d4d4" },
      { t: "get", c: "#dcdcaa" },
      { t: "(comp), i];", c: "#d4d4d4" },
    ],
  },
  {
    ln: "07",
    tokens: [
      { t: "    map.", c: "#d4d4d4" },
      { t: "set", c: "#dcdcaa" },
      { t: "(nums[i], i);", c: "#d4d4d4" },
    ],
  },
  { ln: "08", tokens: [{ t: "  }", c: "#d4d4d4" }] },
  { ln: "09", tokens: [{ t: "}", c: "#d4d4d4" }] },
];

function useScrollReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return [ref, inView];
}
