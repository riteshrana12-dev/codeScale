import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        width="15"
        height="15"
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
        width="15"
        height="15"
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
    to: "/submissionshistory",
    icon: (
      <svg
        width="15"
        height="15"
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
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? "bg-[#060610]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
            : "bg-[#060610]/70 backdrop-blur-md border-b border-white/[0.03]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-mono text-[#00ff9d] text-lg font-bold"
            >
              &gt;_
            </motion.span>
            <span className="font-mono text-white font-semibold text-base tracking-wide group-hover:text-white/90 transition-colors">
              CodeScale
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-[13px] font-medium transition-all duration-150 ${
                    active
                      ? "text-[#00ff9d] bg-[#00ff9d]/[0.07] "
                      : "text-[#666680] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={active ? "text-[#00ff9d]" : "text-[#3a3a55]"}
                  >
                    {item.icon}
                  </span>
                  {item.label}

                  {/* Active Indicator Dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff9d]"
                      style={{ boxShadow: "0 0 5px #00ff9d" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Account */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/account"
              className={`flex items-center gap-2 font-mono text-[12px] px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                isActive("/account")
                  ? "bg-[#00ff9d]/8 border-[#00ff9d]/25 text-[#00ff9d]"
                  : "bg-white/[0.03] border-white/8 text-[#666680] hover:text-white hover:border-white/15"
              }`}
              title="My Account"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isActive("/account")
                    ? "bg-[#00ff9d]/15 text-[#00ff9d]"
                    : "bg-white/8 text-[#888899]"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              Account
            </Link>
          </div>
        </div>

        {/* Accent Bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00ff9d]/10 to-transparent" />
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-14" />
    </>
  );
}
