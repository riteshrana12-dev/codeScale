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

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#00ff9d] text-xl font-bold tracking-tight">
            &gt;_
          </span>
          <span className="font-mono text-white text-lg font-semibold tracking-wide">
            CodeScale
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[#8888a0] hover:text-white text-sm font-mono transition-colors px-4 py-2">
            Sign in
          </button>
          <button className="bg-[#00ff9d] text-[#0a0a0f] text-sm font-mono font-bold px-5 py-2 rounded hover:bg-[#00e88a] transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function CodeWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [ref, inView] = useScrollReveal();

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= CODE_LINES.length) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative rounded-xl overflow-hidden border border-white/10 bg-[#1e1e2e] shadow-2xl shadow-black/60"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#16162a] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 font-mono text-xs text-[#555570]">
          solution.js
        </span>
        <span className="ml-auto font-mono text-xs text-[#00ff9d]">
          ● JavaScript
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[240px]">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={visibleLines > i ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.2 }}
            className="flex gap-4"
          >
            <span className="text-[#3a3a5c] select-none w-5 text-right flex-shrink-0">
              {line.ln}
            </span>
            <span>
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ color: tok.c }}>
                  {tok.t}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[#00ff9d] ml-1 align-middle mt-1"
        />
      </div>
      <div className="px-5 py-3 bg-[#16162a] border-t border-white/5 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#00ff9d]" />
        <span className="font-mono text-xs text-[#00ff9d]">Accepted</span>
        <span className="font-mono text-xs text-[#555570] ml-auto">
          Runtime: 52ms · Memory: 44.1MB
        </span>
      </div>
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />