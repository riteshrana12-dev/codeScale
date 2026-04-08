import { useState, useRef, useEffect } from "react";
import { useProblem } from "../../context/ProblemContext";
import { motion, AnimatePresence } from "framer-motion";

const Language = () => {
  const { solution, setSolution } = useProblem();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = ["JavaScript", "Python"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-32 font-mono text-[11px] px-3 py-1.5 rounded-md border transition-all duration-200 outline-none
          ${
            isOpen
              ? "bg-[#00ff9d]/5 border-[#00ff9d] text-white"
              : "bg-[#0f0f1e] border-white/10 text-[#9999b0] hover:border-white/20 hover:text-white"
          }`}
      >

        <span>{solution.language || "Select"}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#00ff9d]" : "text-[#444460]"}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>