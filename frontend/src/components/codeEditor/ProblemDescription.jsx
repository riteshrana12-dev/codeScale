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
            <div className="px-4 py-2 border-b border-white/5 bg-[#111120]">
              <span className="font-mono text-[13px] text-[#606086]">
                Example {i + 1}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[13px] text-[#606086] uppercase">
                  Input
                </span>
                <code className="font-mono text-xs text-[#00d4ff] bg-[#00d4ff]/5 p-2 rounded border border-[#00d4ff]/10">
                  {exp.input}
                </code>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[13px] text-[#606086] uppercase">
                  Output
                </span>
                <code className="font-mono text-xs text-[#00ff9d] bg-[#00ff9d]/5 p-2 rounded border border-[#00ff9d]/10">
                  {exp.output}
                </code>
              </div>
              {exp.explanation && (
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs text-[#777790] leading-relaxed italic">
                    <span className="text-[#555570] not-italic mr-2">
                      Note:
                    </span>
                    {exp.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.section>
      <div className="h-px bg-white/5 mb-10" />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-10"
      >
        <h2 className="font-mono text-xs text-[#f87171] tracking-widest uppercase mb-4">
          Constraints
        </h2>
        <ul className="space-y-3">
          {problem.constraints?.map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-white/[0.02] p-2 rounded border border-white/5"
            >
              <span className="text-[#f87171] font-mono text-xs tracking-tighter">
                {"{ ! }"}
              </span>
              <code className="font-mono text-xs text-[#9999b0] leading-relaxed italic">
                {c}
              </code>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
};
