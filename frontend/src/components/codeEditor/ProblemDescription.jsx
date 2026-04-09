import React from "react";
import { motion } from "framer-motion";

const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <div
      className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pb-10 mb-10"
      >
        <h1 className="font-mono text-2xl font-black text-white mb-2 leading-tight">
          {problem.title}
        </h1>
        <p className="text-[#9999b0] text-s leading-relaxed font-light whitespace-pre-wrap">
          {problem.description}
        </p>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00ff9d]/50 to-transparent shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent mt-[-1px]" />
        </div>
      </motion.section>
      <div className="h-px bg-white/5 mb-10" />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 space-y-4"
      >
        <h2 className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase mb-4">
          Examples
        </h2>
        {problem.examples.map((exp, i) => (
          <div
            key={exp._id || i}
            className="rounded-xl border border-white/8 bg-[#0d0d1a] overflow-hidden"
          >