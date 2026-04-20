import { useEffect, useState, useCallback } from "react";
import api from "../api/api.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProblemFilter from "../components/FilterProblem.jsx";
import HamburgerMenu from "../components/HamburgerMenu.jsx";

const difficultyColors = {
  Easy: "text-[#00ff9d] border-[#00ff9d]/30 bg-[#00ff9d]/5",
  Medium: "text-[#facc15] border-[#facc15]/30 bg-[#facc15]/5",
  Hard: "text-[#f87171] border-[#f87171]/30 bg-[#f87171]/5",
};

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ difficulty: null, tags: [] });

  const fetchProblems = useCallback(
    async ({ difficulty = null, tags = [], searchText = "" } = {}) => {
      setLoading(true);
      try {
        // search and filter are separate endpoints — decide which to call
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

  // initail load
  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  function handleSearch(text) {
    const trimmedText = text.trim();
    setSearch(trimmedText);
    setFilters({ difficulty: null, tags: [] }); // clear filters when searching
    fetchProblems({ searchText: text });
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setSearch(""); // clear search when filtering
    fetchProblems({ ...newFilters });
  }

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,157,0.07)_0%,transparent_65%)] pointer-events-none" />
      {/* Radial glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.06)_0%,transparent_65%)] pointer-events-none" />
      {/* FIXED HEADER */}
      <div className="flex-shrink-0 pt-2 pb-4 px-6 lg:px-24 bg-[#0a0a0f] z-10 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="text-[#00ff9d] font-mono">&gt;_</span> Challenges
            </h1>
            <p className="text-[#8888a0] font-mono text-sm mt-2 uppercase tracking-[0.2em]">
              {problems.length} Mission Objectives Found
            </p>
          </div>

          {/* VIEW TOGGLE */}
          <HamburgerMenu />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-2">
          <ProblemFilter onFilterChange={handleFilterChange} />
          <div className="flex items-center bg-[#0d0d1a] border border-white/10  rounded-xl shadow-inner gap-2">
            <button
              onClick={() => {
                handleSearch(search);
              }}
              className={`flex items-center gap-2 font-mono text-s font-bold px-4 py-2.5 rounded-xl border transition-all duration-200 
            bg-[#00ff9d]/10 border-[#00ff9d]/35 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.12)]`}
            >
              SEARCH
            </button>
            <input
              type="text"
              name="search"
              placeholder="Search Problem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[30em] text-white pl-2 placeholder-white/70 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center bg-[#0d0d1a] p-1 ">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 font-mono text-xs font-bold px-1.5 py-2.5 w-10 h-10 rounded-xl border transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-[#00ff9d]/10 border-[#00ff9d]/35 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.12)]"
                  : " bg-white/[0.03] border-white/8 text-[#666680] hover:border-white/18 hover:text-[#9999b0]"
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 font-mono text-xs font-bold px-1.5 py-2.5 w-10 h-10 rounded-xl border transition-all duration-200  ${
                viewMode === "list"
                  ? "bg-[#00ff9d]/10 border-[#00ff9d]/35 text-[#00ff9d] shadow-[0_0_14px_rgba(0,255,157,0.12)]"
                  : " bg-white/[0.03] border-white/8 text-[#666680] hover:border-white/18 hover:text-[#9999b0]"
              }`}
            >
              LIST
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE AREA */}
      <div
        className="flex-1 overflow-y-auto px-6 lg:px-24 py-10 scrollbar-hide"
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
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${
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
                    className={`group block relative bg-[#0d0d1a] border border-white/10 transition-colors duration-300 hover:border-[#00ff9d]/50 hover:bg-[#111122] overflow-hidden ${
                      viewMode === "grid"
                        ? "rounded-2xl p-8 h-full flex flex-col"
                        : "rounded-xl p-4 flex flex-row items-center justify-between"
                    }`}
                  >
                    {/* Content Wrapper */}
                    <motion.div
                      layout
                      className={`flex ${viewMode === "grid" ? "flex-col" : "flex-row items-center gap-8 flex-1"}`}
                    >
                      {/* Badge */}
                      <motion.div
                        layout
                        className={viewMode === "grid" ? "mb-6" : "mb-0"}
                      >
                        <span
                          className={`px-3 py-1 rounded border text-[13px] font-black font-mono tracking-widest uppercase ${difficultyColors[p.difficulty] || difficultyColors.Medium}`}
                        >
                          {p.difficulty}
                        </span>
                      </motion.div>

                      {/* Text Container */}
                      <motion.div
                        layout
                        className={viewMode === "list" ? "flex-1" : ""}
                      >
                        <motion.h3
                          layout="position"
                          className={`font-bold text-white group-hover:text-[#00ff9d] transition-colors ${
                            viewMode === "grid"
                              ? "text-xl mb-2"
                              : "text-lg mb-0"
                          }`}
                        >
                          {p.title}
                        </motion.h3>

                        <motion.p
                          layout="position"
                          className={`text-[#a0a0c0] font-normal leading-relaxed ${
                            viewMode === "grid"
                              ? "text-sm line-clamp-2"
                              : "text-xs line-clamp-1 opacity-60"
                          }`}
                        >
                          {p.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>

                    {/* Footer / Action */}
                    <motion.div
                      layout
                      className={`flex items-center justify-between ${
                        viewMode === "grid"
                          ? "mt-8 pt-6 border-t border-white/5"
                          : "ml-8 border-l border-white/5 pl-8"
                      }`}
                    >
                      <motion.div layout className="flex gap-2">
                        {p.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-[#65658b] font-semibold font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div
                        layout
                        className="text-[#00ff9d] flex items-center gap-3"
                      >
                        <AnimatePresence>
                          {viewMode === "grid" && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              className="text-[12px] font-black font-semibold tracking-tighter"
                            >
                              SOLVE_CHALLENGE
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <span className="text-xl group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Sublte lightning highlight on hover */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff9d]/0 group-hover:via-[#00ff9d]/40 to-transparent transition-all duration-500" />
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
