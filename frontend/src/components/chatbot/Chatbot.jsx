import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useChatBot from "../../hooks/useChatBot";

// ── Markdown-lite renderer for bold, code, bullets ──────────────────────────
function renderContent(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // bullet
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
    // numbered list
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
    // empty line
    if (line.trim() === "") return <div key={i} className="h-2" />;
    // normal
    return (
      <p key={i} className="my-0.5">
        {inlineFormat(line)}
      </p>
    );
  });
}

function inlineFormat(text) {
  // split on **bold**, `code`, and normal text
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

// ── Typing indicator ─────────────────────────────────────────────────────────
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

// ── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg, isLatest }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUser
            ? "bg-[#00ff9d]/10 border border-[#00ff9d]/20"
            : "bg-[#00d4ff]/10 border border-[#00d4ff]/20"
        }`}
      >
        {isUser ? (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00ff9d"
            strokeWidth="2"
            strokeLinecap="round"
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

      {/* Bubble */}
      <div
        className={`max-w-[82%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed font-mono ${
            isUser
              ? "bg-[#00ff9d]/10 border border-[#00ff9d]/15 text-[#e0e0ee] rounded-tr-sm"
              : "bg-[#111128] border border-white/8 text-[#c8c8d8] rounded-tl-sm"
          }`}
        >
          <div className="text-[15.5px] leading-[1.65]">
            {isUser ? msg.content : renderContent(msg.content)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "How do I approach Two Sum?",
  "Explain sliding window technique",
  "When should I use BFS vs DFS?",
  "How does binary search work?",
  "Tips for dynamic programming?",
];

// ── Main ChatBot component ───────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, loading, error, sendMessage, clearChat } = useChatBot();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isEmpty = messages.length === 0;

  // scroll to bottom on new message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  // focus input when opened
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

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[550px] flex flex-col"
            style={{ height: 625, maxHeight: "80vh" }}
          >
            <div
              className="flex flex-col h-full bg-[#0d0d1a]/98 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Top accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent flex-shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                    <span className="font-mono text-[#00d4ff] text-sm font-black">
                      &gt;_
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-white text-m font-bold leading-none">
                      CodeScale Assistant
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.8">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                      <p className="font-mono text-[13px] text-[#00ff9d]">
                        Online · DSA only
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#444460] hover:text-[#f87171] hover:bg-[#f87171]/8 transition-all"
                      title="Clear chat"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#7b7b91] hover:text-white hover:bg-white/8 transition-all"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 [&::-webkit-scrollbar]:hidden">
                {/* Empty state */}
                {isEmpty && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center justify-center h-full gap-5 pb-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/8 border border-[#00d4ff]/20 flex items-center justify-center">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-m text-white font-bold mb-1">
                        Ask me anything DSA
                      </p>
                      <p className="font-mono text-[15px] text-[#747495] leading-relaxed">
                        Approach guidance · Concepts · Complexity
                        <br />
                        Patterns · Competitive programming
                      </p>
                    </div>

                    {/* Suggestion chips */}
                    <div className="flex flex-col gap-2 w-full">
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          onClick={() => {
                            setInput(s);
                            inputRef.current?.focus();
                          }}
                          className="w-full text-left font-mono text-s text-[#666680] px-3 py-2 rounded-xl border border-white/6 bg-white/[0.025] hover:border-[#00d4ff]/25 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-150"
                        >
                          <span className="text-[#333350] mr-2">▸</span>
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Messages */}
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    msg={msg}
                    isLatest={i === messages.length - 1}
                  />
                ))}

                {/* Loading */}
                {loading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-mono text-[#00d4ff] text-[10px] font-black">
                        &gt;_
                      </span>
                    </div>
                    <div className="bg-[#111128] border border-white/8 rounded-2xl rounded-tl-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#f87171]/8 border border-[#f87171]/20">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="font-mono text-xs text-[#f87171]">{error}</p>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div className="flex-shrink-0 border-t border-white/5 p-3">
                <div
                  className={`flex items-end gap-2 rounded-xl border transition-all duration-200 px-3 py-2 ${
                    input.length > 0
                      ? "border-[#00d4ff]/35 bg-[#00d4ff]/5"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 100) + "px";
                    }}
                    onKeyDown={handleKey}
                    placeholder="Ask about DSA, approach, complexity..."
                    disabled={loading}
                    rows={1}
                    className="flex-1 bg-transparent font-mono text-xs text-white placeholder-[#6c6c8d] outline-none resize-none leading-relaxed disabled:opacity-50"
                    style={{ minHeight: 22, maxHeight: 100 }}
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    whileTap={{ scale: 0.88 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed bg-[#00ff9d] hover:bg-[#00e88a]"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0a0a0f"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>
                </div>
                <p className="font-mono text-[9px] text-[#1e1e30] text-center mt-2 tracking-widest">
                  ENTER TO SEND · DSA TOPICS ONLY
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          open ? "bg-[#0d0d1a] border-2 border-[#00d4ff]/40 " : "bg-[#00ff9d]  "
        }`}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread dot — shows when closed and there are messages */}
        {!open && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00d4ff] border-2 border-[#0a0a0f] flex items-center justify-center">
            <span className="font-mono text-[8px] text-[#0a0a0f] font-black">
              {messages.filter((m) => m.role === "assistant").length}
            </span>
          </span>
        )}
      </motion.button>
    </>
  );
}
