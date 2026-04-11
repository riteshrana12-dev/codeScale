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