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
