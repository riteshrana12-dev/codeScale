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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 w-full bg-[#0d0d1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSolution({ ...solution, language: lang });
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 font-mono text-[11px] transition-colors
                  ${
                    solution.language === lang
                      ? "bg-[#00ff9d]/10 text-[#00ff9d]"
                      : "text-[#9999b0] hover:bg-white/[0.03] hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-between">
                  {lang}
                  {solution.language === lang && (
                    <div className="w-1 h-1 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]" />
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
