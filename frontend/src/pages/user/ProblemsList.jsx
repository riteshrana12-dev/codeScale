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