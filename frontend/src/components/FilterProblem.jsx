import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DIFF_CONFIG = {
  Easy: { color: "#00ff9d", glow: "rgba(0,255,157,0.45)" },
  Medium: { color: "#facc15", glow: "rgba(250,204,21,0.45)" },
  Hard: { color: "#f87171", glow: "rgba(248,113,113,0.45)" },
};

const TAGS = [
  "Array",
  "String",
  "Hash Map",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Queue",
  "Linked List",
  "Binary Search",
  "Tree",
  "Binary Tree",
  "BST",
  "Graph",
  "BFS",
  "DFS",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Sorting",
  "Math",
  "Bit Manipulation",
  "Recursion",
  "Heap",
  "Trie",
  "Matrix",
];

const ARENA_R = 230;
const BALL_R = 30;
const SPRING = { type: "spring", stiffness: 420, damping: 26 };

/* Stable starting grid so tags spread out immediately */
function getStartPos(index, total) {
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const cellW = (ARENA_R * 2.5) / cols;
  const cellH = (ARENA_R * 2.5) / rows;
  return {
    x: -((cols - 1) * cellW) / 2 + col * cellW + (Math.random() - 0.5) * 8,
    y: -((rows - 1) * cellH) / 2 + row * cellH + (Math.random() - 0.5) * 8,
  };
}

/* ─── Physics ─── */
function useBalls(tags) {
  const state = useRef({});
  const [pos, setPos] = useState({});
  const raf = useRef(null);

  useEffect(() => {
    const cur = state.current;
    // seed new
    tags.forEach((t, i) => {
      if (!cur[t]) {
        const sp = getStartPos(i, tags.length);
        cur[t] = { x: sp.x, y: sp.y, vx: 0, vy: 0 };
      }
    });
    // remove gone
    Object.keys(cur).forEach((k) => {
      if (!tags.includes(k)) delete cur[k];
    });
  }, [tags]);