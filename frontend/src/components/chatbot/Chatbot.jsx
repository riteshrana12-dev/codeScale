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

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  function handleSend() {
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
    setInput("");
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            className="fixed bottom-24 right-6 z-50 w-[550px] flex flex-col"
            style={{ height: 625, maxHeight: "80vh" }}
          >
            <div className="flex flex-col h-full bg-[#0d0d1a]/98 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden"
                 style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)" }}>
              <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent flex-shrink-0" />
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                    <span className="font-mono text-[#00d4ff] text-sm font-black">&gt;_</span>
                  </div>
                  <div>
                    <p className="font-mono text-white text-m font-bold leading-none">CodeScale Assistant</p>
                    <div className="flex items-center gap-1.5 mt-1.8">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                      <p className="font-mono text-[13px] text-[#00ff9d]">Online · DSA only</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button onClick={clearChat} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#444460] hover:text-[#f87171] hover:bg-[#f87171]/8 transition-all">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#7b7b91] hover:text-white hover:bg-white/8 transition-all">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 [&::-webkit-scrollbar]:hidden">
                {isEmpty && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full gap-5 pb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/8 border border-[#00d4ff]/20 flex items-center justify-center">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-m text-white font-bold mb-1">Ask me anything DSA</p>
                      <p className="font-mono text-[15px] text-[#747495] leading-relaxed">Approach guidance · Concepts · Complexity <br /> Patterns · Competitive programming</p>
                    </div>