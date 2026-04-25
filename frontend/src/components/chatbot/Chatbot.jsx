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

function MessageBubble({ msg, isLatest }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isUser ? "bg-[#00ff9d]/10 border border-[#00ff9d]/20" : "bg-[#00d4ff]/10 border border-[#00d4ff]/20"}`}
      >
        {isUser ? (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00ff9d"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <span className="font-mono text-[#00d4ff] text-[10px] font-black">
            &gt;_
          </span>
        )}
      </div>
      <div
        className={`max-w-[82%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed font-mono ${isUser ? "bg-[#00ff9d]/10 border border-[#00ff9d]/15 text-[#e0e0ee] rounded-tr-sm" : "bg-[#111128] border border-white/8 text-[#c8c8d8] rounded-tl-sm"}`}
        >
          <div className="text-[15.5px] leading-[1.65]">
            {isUser ? msg.content : renderContent(msg.content)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SUGGESTIONS = [
  "How do I approach Two Sum?",
  "Explain sliding window technique",
  "When should I use BFS vs DFS?",
  "How does binary search work?",
  "Tips for dynamic programming?",
];


export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, error, sendMessage, clearChat } = useChatBot();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isEmpty = messages.length === 0;