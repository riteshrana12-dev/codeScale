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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,255,157,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20"
      >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-[#00ff9d]/20 bg-[#00ff9d]/5 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase">
              JavaScript & Python · Open Beta
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white mb-6"
          >
            Code.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]">
              Execute.
            </span>
            <br />
            Improve.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[#8888a0] text-lg leading-relaxed mb-10 max-w-md font-light"
          >
            A focused coding judge for developers. Solve real algorithmic
            problems, get instant verdicts, and track your growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-4"
          >
            <button className="group relative bg-[#00ff9d] text-[#0a0a0f] font-mono font-bold px-8 py-4 rounded-lg text-base hover:bg-[#00e88a] transition-all duration-200 overflow-hidden">
              <span className="relative z-10">Start Solving →</span>
            </button>
            <button className="font-mono text-sm text-[#8888a0] hover:text-white transition-colors border border-white/10 hover:border-white/20 px-6 py-4 rounded-lg">
              View Problems
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6 mt-12"
          >
            {DIFFICULTIES.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="font-mono text-xs text-[#555570]">
                  {d.count} {d.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeWindow />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-[#555570] tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#555570] to-transparent"
        />
      </motion.div>
    </section>
  );
}
function StatsBar() {
  const [ref, inView] = useScrollReveal();
  const stats = [
    { value: "20+", label: "Problems" },
    { value: "1k+", label: "Submissions" },
    { value: "1.2k+", label: "Developers" },
    { value: "98%", label: "Uptime" },
  ];

  return (
    <section ref={ref} className="border-y border-white/5 bg-[#0d0d1a]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-mono text-3xl font-black text-white mb-1">
              {s.value}
            </div>
            <div className="font-mono text-xs text-[#555570] tracking-widest uppercase">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function FeaturesSection() {
  const [ref, inView] = useScrollReveal();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-[#00ff9d]/20" />
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase block mb-4">
            // features
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Everything you need.
            <br />
            <span className="text-[#444460]">Nothing you don't.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">

        {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group bg-[#0a0a0f] hover:bg-[#0f0f1e] p-8 transition-colors duration-300 cursor-default"
            >

              <div
                className="mb-5 font-mono text-3xl"
                style={{ color: f.accent }}
              >
                {f.icon}
              </div>
              <h3 className="font-mono text-white font-bold text-lg mb-3 group-hover:text-white/90">
                {f.title}
              </h3>
              <p className="text-[#666680] text-sm leading-relaxed">{f.desc}</p>
              <div
                className="mt-6 w-8 h-px transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: f.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [ref, inView] = useScrollReveal();
  const steps = [
    {
      num: "01",
      title: "Pick a problem",
      desc: "Browse by difficulty, tag, or search. Each problem has a clear description, constraints, and examples.",
      color: "#00ff9d",
    },
    {
      num: "02",
      title: "Write your solution",
      desc: "Use the Monaco editor to write JavaScript. Auto-complete and syntax highlighting are built in.",
      color: "#00d4ff",
    },
    {
      num: "03",
      title: "Submit & get verdict",
      desc: "Your code runs against hidden test cases in a sandboxed environment. Get instant, detailed feedback.",
      color: "#a78bfa",
    },
    {
      num: "04",
      title: "Track your progress",
      desc: "Every submission is stored. Watch your acceptance rate, streak, and rank improve over time.",
      color: "#fb923c",
    },
  ];

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-[#a78bfa] tracking-widest uppercase block mb-4">
            // how it works
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Four steps.
            <br />
            <span className="text-[#444460]">Infinite growth.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
              )}

              <div className="border border-white/5 bg-[#0d0d1a] rounded-xl p-6 hover:border-white/10 transition-colors h-full">
                <div
                  className="font-mono text-5xl font-black mb-4"
                  style={{ color: s.color, opacity: 0.3 }}
                >
                  {s.num}
                </div>
                <h3 className="font-mono text-white font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-[#555570] text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, inView] = useScrollReveal();
  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.06)_0%,transparent_65%)]" />