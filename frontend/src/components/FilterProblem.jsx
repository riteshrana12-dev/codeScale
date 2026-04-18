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

/* ─── Component ─── */
export default function ProblemFilter({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const panelRef = useRef(null);

  const available = TAGS.filter((t) => !selectedTags.includes(t));
  const positions = useBalls(open ? available : []);
  const activeCount = (difficulty ? 1 : 0) + selectedTags.length;
  const SIZE = ARENA_R * 2.5; // 440px

  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

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

  return (
    <div className="relative" ref={panelRef}>
      {/* ── Trigger ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.93 }}
        className={`flex items-center gap-2 font-mono text-s font-bold px-4 py-2.5 rounded-xl border transition-all duration-200 ${
          open || activeCount > 0
            ? "bg-[#00ff9d]/10 border-[#00ff9d]/35 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.12)]"
            : "bg-white/[0.03] border-white/8 text-[#666680] hover:border-white/18 hover:text-[#9999b0]"
        }`}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
        <AnimatePresence>
          {activeCount > 0 && (
            <motion.span
              key="b"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 20 }}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00ff9d] text-[#0a0a0f] text-[15px] font-black"
            >
              {activeCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50"
            style={{ top: "calc(100% + 10px)", left: 0, width: SIZE + 40 }}
          >
            <div
              className="bg-[#0d0d1a]/98 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.85)" }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-[#00ff9d]/35 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#00ff9d]/8 border border-[#00ff9d]/15 flex items-center justify-center">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00ff9d"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </div>
                  <span className="font-mono text-sm font-bold text-white">
                    Filter Problems
                  </span>
                </div>
                <AnimatePresence>
                  {activeCount > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={clearAll}
                      className="font-mono text-s text-[#555570] hover:text-[#f87171] flex items-center gap-1 transition-colors"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      clear all
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Circle arena ── */}
              <div className="flex justify-center px-5 pb-4">
                <div
                  className="relative rounded-full border border-white/8 flex-shrink-0"
                  style={{
                    width: SIZE,
                    height: SIZE,
                    background:
                      "radial-gradient(circle at center, rgba(0,255,157,0.025) 0%, rgba(0,212,255,0.015) 55%, transparent 100%)",
                  }}
                >
                  {/* Dashed inner ring */}
                  <div
                    className="absolute rounded-full border border-dashed border-white/[0.05] pointer-events-none"
                    style={{
                      width: SIZE * 0.65,
                      height: SIZE * 0.65,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* ── Difficulty row — inside top ── */}
                  <div
                    className="absolute flex items-center justify-center gap-3"
                    style={{ top: 0, left: 0, right: 0, zIndex: 15 }}
                  >
                    {DIFFICULTIES.map((d) => {
                      const cfg = DIFF_CONFIG[d];
                      const active = difficulty === d;
                      return (
                        <motion.button
                          key={d}
                          onClick={() => toggleDiff(d)}
                          whileHover={{ y: -2, scale: 1.08 }}
                          whileTap={{ scale: 0.88 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 22,
                          }}
                          className="font-mono text-s font-black px-3.5 py-1.5 rounded-full border select-none flex items-center gap-1.5"
                          style={{
                            color: cfg.color,
                            background: active
                              ? `${cfg.color}18`
                              : "rgba(10,10,20,0.92)",
                            borderColor: active ? cfg.color : `${cfg.color}40`,
                            boxShadow: active ? `0 0 16px ${cfg.glow}` : "none",
                            backdropFilter: "blur(10px)",
                            transition: "all 0.18s ease",
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: cfg.color,
                              opacity: active ? 1 : 0.35,
                              boxShadow: active
                                ? `0 0 6px ${cfg.color}`
                                : "none",
                            }}
                          />
                          {d}
                          <AnimatePresence>
                            {active && (
                              <motion.svg
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 22,
                                }}
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                  {/* ── Tag balls (physics) ── */}
                  <AnimatePresence>
                    {available.map((tag) => {
                      const p = positions[tag];
                      if (!p) return null;
                      return (
                        <motion.button
                          key={tag}
                          title={tag}
                          onClick={() => addTag(tag)}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                          exit={{
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 0.15 },
                          }}
                          transition={{
                            x: { duration: 0 },
                            y: { duration: 0 },
                            opacity: SPRING,
                            scale: SPRING,
                          }}
                          whileHover={{ scale: 1.5, zIndex: 30 }}
                          whileTap={{ scale: 0.85 }}
                          className="absolute flex items-center justify-center rounded-full cursor-pointer select-none group"
                          style={{
                            width: BALL_R * 3,
                            height: BALL_R * 3,
                            left: "50%",
                            top: "50%",
                            marginLeft: -BALL_R,
                            marginTop: -BALL_R,
                            background: "rgba(17,17,40,0.9)",
                            border: "1.5px solid rgba(255,255,255,0.1)",
                            zIndex: 5,
                            backdropFilter: "blur(4px)",
                            transition: "border-color 0.15s, background 0.15s",
                          }}
                        >
                          {/* hover glow ring */}
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            style={{
                              border: "1.5px solid rgba(0,212,255,0.5)",
                              background: "rgba(0,212,255,0.08)",
                            }}
                          />
                          <span
                            className="relative z-10 group-hover:text-[#00d4ff] transition-colors duration-150 pointer-events-none font-mono font-bold  "
                            style={{
                              fontSize:
                                tag.length > 11 ? 13 : tag.length > 8 ? 13 : 15,
                              color: "#8888aa",
                              wordBreak: "break-word",
                              maxWidth: BALL_R * 1.8,
                            }}
                          >
                            {tag.length > 10 ? tag.replace(" ", "\n") : tag}
                          </span>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>

                  {/* empty */}
                  {available.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-mono text-sm text-[#333350]">
                        all selected ✓
                      </p>
                    </div>
                  )}

                  {/* bottom hint */}
                  <p
                    className="absolute font-mono text-[9px] text-[#252538] tracking-widest text-center"
                    style={{
                      bottom: 16,
                      left: 0,
                      right: 0,
                      pointerEvents: "none",
                    }}
                  >
                    CLICK BALL TO ADD FILTER
                  </p>
                </div>
              </div>

              {/* ── Selected tag pills ── */}
              <AnimatePresence>
                {selectedTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-white/5 px-5 py-3 flex flex-wrap gap-2"
                  >
                    <AnimatePresence>
                      {selectedTags.map((tag) => (
                        <motion.button
                          key={tag}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{
                            scale: 0,
                            opacity: 0,
                            transition: { duration: 0.12 },
                          }}
                          transition={SPRING}
                          onClick={() => removeTag(tag)}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.88 }}
                          className="flex items-center gap-1.5 font-mono text-s px-3 py-1.5 rounded-full border border-[#00d4ff]/25 bg-[#00d4ff]/8 text-[#00d4ff] group hover:border-[#f87171]/40 hover:bg-[#f87171]/8 hover:text-[#f87171] transition-colors duration-150"
                        >
                          {tag}
                          <motion.svg
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.15 }}
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-50 group-hover:opacity-100 flex-shrink-0"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </motion.svg>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
