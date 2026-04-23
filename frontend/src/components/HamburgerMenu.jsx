import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Problems",
    to: "/problems",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Submissions",
    to: "/submissionHistory",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    label: "Profile",
    to: "/profile",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNav(to) {
    navigate(to);
    setOpen(false);
  }

  const isActive = (to) => location.pathname === to;

  return (
    /* This whole thing sits inline inside the navbar flex row */
    <div className="flex items-center gap-2">
      {/* ── Hamburger icon button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.88 }}
        className={`relative z-10 flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-xl border transition-all duration-200 flex-shrink-0 ${
          open
            ? "bg-[#00ff9d]/10 border-[#00ff9d]/35 shadow-[0_0_12px_rgba(0,255,157,0.1)]"
            : "bg-white/[0.03] border-white/8 hover:border-white/20 hover:bg-white/[0.06]"
        }`}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {/* Bar 1 */}
        <motion.span
          animate={
            open
              ? { rotate: 45, y: 6.5, backgroundColor: "#00ff9d" }
              : { rotate: 0, y: 0, backgroundColor: "#888899" }
          }
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="block rounded-full"
          style={{ width: 15, height: 1.5, transformOrigin: "center" }}
        />
        {/* Bar 2 */}
        <motion.span
          animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="block rounded-full bg-[#888899]"
          style={{ width: 10, height: 1.5 }}
        />
        {/* Bar 3 */}
        <motion.span
          animate={
            open
              ? { rotate: -45, y: -6.5, backgroundColor: "#00ff9d" }
              : { rotate: 0, y: 0, backgroundColor: "#888899" }
          }
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="block rounded-full"
          style={{ width: 15, height: 1.5, transformOrigin: "center" }}
        />
      </motion.button>

      {/* ── Horizontal expanding nav items — inline in navbar ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            className="flex items-center overflow-hidden"
            style={{ gap: 0 }}
          >
            {/* Left separator */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.2 }}
              className="w-px h-5 bg-white/10 mx-2 flex-shrink-0"
            />

            {NAV_ITEMS.map((item, i) => {
              const active = isActive(item.to);
              return (
                <motion.button
                  key={item.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: -6,
                    transition: { delay: 0, duration: 0.12 },
                  }}
                  transition={{
                    delay: 0.06 + i * 0.055,
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleNav(item.to)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.92 }}
                  className={`flex items-center gap-1.5 font-mono text-s font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 flex-shrink-0 mx-0.5 ${
                    active
                      ? "bg-[#00ff9d]/8 border-[#00ff9d]/20 text-[#00ff9d]"
                      : "border-transparent text-[#666680] hover:text-white hover:bg-white/[0.05] hover:border-white/8"
                  }`}
                >
                  <span
                    className={active ? "text-[#00ff9d]" : "text-[#444460]"}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {active && (
                    <span
                      className="w-1 h-1 rounded-full bg-[#00ff9d] flex-shrink-0"
                      style={{ boxShadow: "0 0 5px #00ff9d" }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
