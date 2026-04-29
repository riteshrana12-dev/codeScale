import { useEffect, useState, useCallback } from "react";
import api from "../api/api.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProblemFilter from "../components/FilterProblem.jsx";

const difficultyColors = {
  Easy: "text-[#00ff9d] border-[#00ff9d]/30 bg-[#00ff9d]/5",
  Medium: "text-[#facc15] border-[#facc15]/30 bg-[#facc15]/5",
  Hard: "text-[#f87171] border-[#f87171]/30 bg-[#f87171]/5",
};

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ difficulty: null, tags: [] });

  const fetchProblems = useCallback(
    async ({ difficulty = null, tags = [], searchText = "" } = {}) => {
      setLoading(true);
      try {
        if (searchText.trim()) {
          const response = await api.get(
            `/problems/search?text=${encodeURIComponent(searchText)}`,
          );
          setProblems(response.data.data);
        } else {
          const params = {};
          if (difficulty) params.difficulty = difficulty;
          if (tags.length > 0) params.tags = tags.join(",");
          const response = await api.get(`/problems/`, { params });
          setProblems(response.data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  function handleSearch(text) {
    setSearch(text.trim());
    setFilters({ difficulty: null, tags: [] });
    fetchProblems({ searchText: text });
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setSearch("");
    fetchProblems({ ...newFilters });
  }

  return (
    /*
     * h-[calc(100vh-3.5rem)]  = full viewport minus the 56px (h-14) navbar
     * flex flex-col + overflow-hidden = only the inner list div scrolls
     */
    <div className="h-[calc(100vh-3.5rem)] bg-[#0a0a0f] flex flex-col overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      {/* Glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,157,0.07)_0%,transparent_65%)] pointer-events-none" />
      {/* Glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-20 flex-shrink-0 px-6 lg:px-16 py-3 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Filter dropdown */}
          <ProblemFilter onFilterChange={handleFilterChange} />

          {/* Search bar */}
          <div className="flex items-center flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => handleSearch(search)}
              className="flex-shrink-0 flex items-center gap-1.5 font-mono text-xs font-bold px-4 py-2.5 border-r border-white/10 bg-[#00ff9d]/10 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.12)] transition-all hover:bg-[#00ff9d]/15"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              SEARCH
            </button>
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
              className="flex-1 min-w-0 text-white text-sm pl-3 pr-3 py-2.5 placeholder-white/20 bg-transparent outline-none font-mono"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  fetchProblems();
                }}
                className="flex-shrink-0 pr-3 text-[#444460] hover:text-white transition-colors"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center gap-1 bg-[#0d0d1a] border border-white/8 rounded-xl p-1 flex-shrink-0">
            {[
              {
                mode: "grid",
                icon: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                ),
              },
              {
                mode: "list",
                icon: (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                ),
              },
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold px-3 py-2 rounded-lg border transition-all duration-200 ${
                  viewMode === mode
                    ? "bg-[#00ff9d]/10 border-[#00ff9d]/30 text-[#00ff9d] shadow-[0_0_10px_rgba(0,255,157,0.1)]"
                    : "border-transparent text-[#555575] hover:text-[#9999b0]"
                }`}
              >
                {icon}
                {mode.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Problem count */}
          {!loading && (
            <div className="flex-shrink-0 font-mono text-[11px] text-[#444460] hidden lg:block">
              <span className="text-white font-bold">{problems.length}</span>{" "}
              problems
            </div>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE LIST ── */}
      <div
        className="relative z-10 flex-1 overflow-y-auto px-6 lg:px-16 py-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full"
            />
          </div>
        ) : problems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#444460"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="font-mono text-sm text-[#444460]">
              No problems found
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilters({ difficulty: null, tags: [] });
                fetchProblems();
              }}
              className="font-mono text-xs text-[#555575] hover:text-[#00ff9d] transition-colors"
            >
              Clear filters →
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-5 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-5xl mx-auto"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {problems.map((p) => (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Link
                    to={`/problems/${p.slug}`}
                    className={`group block relative bg-[#0d0d1a] border border-white/10 transition-all duration-300 hover:border-[#00ff9d]/50 hover:bg-[#111122] overflow-hidden ${
                      viewMode === "grid"
                        ? "rounded-2xl p-5 h-[200px] flex flex-col"
                        : "rounded-xl p-4 flex flex-row items-center justify-between"
                    }`}
                  >
                    {/* Top shine on hover */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff9d]/0 group-hover:via-[#00ff9d]/40 to-transparent transition-all duration-500" />

                    {/* Content */}
                    <motion.div
                      layout
                      className={`flex ${viewMode === "grid" ? "flex-col" : "flex-row items-center gap-7 flex-1"}`}
                    >
                      <motion.div
                        layout
                        className={viewMode === "grid" ? "mb-4" : "mb-0"}
                      >
                        <span
                          className={`px-2.5 py-0.5 rounded border text-[10px] font-black font-mono tracking-widest uppercase ${difficultyColors[p.difficulty] || difficultyColors.Medium}`}
                        >
                          {p.difficulty}
                        </span>
                      </motion.div>

                      <motion.div
                        layout
                        className={viewMode === "list" ? "flex-1" : ""}
                      >
                        <div className="flex flex-1 justify-between items-start ">
                          <motion.h3
                            layout="position"
                            className={`font-bold text-white group-hover:text-[#00ff9d] transition-colors ${
                              viewMode === "grid"
                                ? "text-base mb-1.5"
                                : "text-base mb-0"
                            }`}
                          >
                            {p.title}
                          </motion.h3>
                          {/* Checking if the problem is solved and showing the "Solved" badge */}
                          {p.isSolved && (
                            <div className="inline-flex items-center gap-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#facc15]">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              Solved
                            </div>
                          )}
                        </div>
                        <motion.p
                          layout="position"
                          className={`text-[#a0a0c0] font-normal leading-relaxed ${
                            viewMode === "grid"
                              ? "text-xs line-clamp-2"
                              : "text-xs line-clamp-1 opacity-60"
                          }`}
                        >
                          {p.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                      layout
                      className={`flex items-center justify-between ${
                        viewMode === "grid"
                          ? "mt-auto pt-4 border-t border-white/5"
                          : "ml-8 border-l border-white/5 pl-8 flex-shrink-0"
                      }`}
                    >
                      <motion.div layout className="flex gap-1.5">
                        {p.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] text-[#65658b] font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div
                        layout
                        className="text-[#00ff9d] flex items-center gap-2"
                      >
                        <AnimatePresence>
                          {viewMode === "grid" && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              className="text-[10px] font-bold tracking-tighter"
                            >
                              SOLVE_CHALLENGE
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProblemsList;
