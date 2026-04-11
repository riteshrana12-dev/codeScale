import { useEffect, useState } from "react";
import api from "../../api/api.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const difficultyColors = {
  Easy: "text-[#00ff9d] border-[#00ff9d]/30 bg-[#00ff9d]/5",
  Medium: "text-[#facc15] border-[#facc15]/30 bg-[#facc15]/5",
  Hard: "text-[#f87171] border-[#f87171]/30 bg-[#f87171]/5",
};

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  async function listOfProblem() {
    try {
      const response = await api.get("/problems/");
      setProblems(response.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    listOfProblem();
  }, []);

  if (loading)
    return (
      <div className="h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full"
        />
      </div>
    );
    return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,157,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.06)_0%,transparent_65%)] pointer-events-none" />
      <div className="flex-shrink-0 pt-2 pb-2 px-6 lg:px-24 bg-[#0a0a0f] z-10 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="text-[#00ff9d] font-mono">&gt;_</span> Challenges
            </h1>
            <p className="text-[#8888a0] font-mono text-sm mt-2 uppercase tracking-[0.2em]">
              {problems.length} Mission Objectives Found
            </p>
          </div>
          <div className="flex items-center bg-[#0d0d1a] border border-white/10 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-6 py-2 rounded-lg font-mono text-xs transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#00ff9d] text-black font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                  : "text-[#555570] hover:text-white"
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-6 py-2 rounded-lg font-mono text-xs transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#00ff9d] text-black font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                  : "text-[#555570] hover:text-white"
              }`}
            >
              LIST
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto px-6 lg:px-24 py-10 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >