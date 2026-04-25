import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useChatBot from "../../hooks/useChatBot";

function renderContent(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
      const content = line.trim().slice(2);
      return (
        <div key={i} className="flex gap-2 my-0.5">
          <span className="text-[#00ff9d] mt-0.5 flex-shrink-0 font-mono">
            ▸
          </span>
          <span>{inlineFormat(content)}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(line.trim())) {
      const [num, ...rest] = line.trim().split(". ");
      return (
        <div key={i} className="flex gap-2 my-0.5">
          <span className="text-[#00d4ff] flex-shrink-0 font-mono text-xs w-4">
            {num}.
          </span>
          <span>{inlineFormat(rest.join(". "))}</span>
        </div>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return (
      <p key={i} className="my-0.5">
        {inlineFormat(line)}
      </p>
    );
  });
}

function inlineFormat(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-bold text-[16px]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-mono text-[14px] px-1.5 py-0.5 rounded bg-[#1a1a35] text-[#00d4ff] border border-[#00d4ff]/15"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.8 h-1.8 rounded-full bg-[#00ff9d]/50"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}
