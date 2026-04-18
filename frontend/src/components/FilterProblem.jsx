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

  const tick = useCallback(() => {
    const p = state.current;
    const keys = Object.keys(p);
    const WALL = ARENA_R - BALL_R - 8;
    const PULL = 0.0; // NO center pull — let repulsion spread them
    const REPEL = 2.5; // strong repel so they don't overlap
    const SETTLE = 0.004; // very tiny drift toward own "home" zone
    const FRIC = 0.94; // high friction → barely moving

    keys.forEach((k) => {
      const b = p[k];

      // repel from every other ball — strong enough to prevent overlap
      keys.forEach((j) => {
        if (j === k) return;
        const dx = b.x - p[j].x;
        const dy = b.y - p[j].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const min = BALL_R * 2 + 6; // 6px gap between balls
        if (d < min) {
          const overlap = min - d;
          const fx = (dx / d) * overlap * REPEL * 0.06;
          const fy = (dy / d) * overlap * REPEL * 0.06;
          b.vx += fx;
          b.vy += fy;
        }
      });

      b.vx *= FRIC;
      b.vy *= FRIC;
      b.x += b.vx;
      b.y += b.vy;

      // clamp inside circle — hard clamp, no bouncing energy
      const dist = Math.sqrt(b.x * b.x + b.y * b.y);
      if (dist > WALL) {
        const nx = b.x / dist;
        const ny = b.y / dist;
        b.x = nx * WALL;
        b.y = ny * WALL;
        // kill velocity component toward wall
        const dot = b.vx * nx + b.vy * ny;
        if (dot > 0) {
          b.vx -= dot * nx;
          b.vy -= dot * ny;
        }
        b.vx *= 0.3;
        b.vy *= 0.3;
      }
    });

    setPos({ ...p });
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);
  return pos;
}

function toggleDiff(d) {
  const next = difficulty === d ? null : d;
  setDifficulty(next);
  onFilterChange?.({ difficulty: next, tags: selectedTags });
}
function addTag(tag) {
  if (selectedTags.includes(tag)) return;
  const next = [...selectedTags, tag];
  setSelectedTags(next);
  onFilterChange?.({ difficulty, tags: next });
}
function removeTag(tag) {
  const next = selectedTags.filter((t) => t !== tag);
  setSelectedTags(next);
  onFilterChange?.({ difficulty, tags: next });
}
function clearAll() {
  setDifficulty(null);
  setSelectedTags([]);
  onFilterChange?.({ difficulty: null, tags: [] });
}
