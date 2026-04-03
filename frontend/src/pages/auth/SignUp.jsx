import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/signUp.js";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 5,
}));

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  delay,
  extra,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPw ? "text" : "password") : type;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-xs text-[#555570] tracking-widest uppercase">
          {label}
        </label>
        {extra}
      </div>
      <div
        className={`relative rounded-lg border transition-all duration-300 ${
          focused
            ? "border-[#00ff9d]/50 bg-[#00ff9d]/5 shadow-[0_0_22px_rgba(0,255,157,0.08)]"
            : "border-white/8 bg-white/[0.03] hover:border-white/15"
        }`}
      >
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300"
          style={{ color: focused ? "#00ff9d" : "#444460" }}
        >
          {icon}
        </div>
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={isPassword ? "new-password" : name}
          className="w-full bg-transparent pl-10 pr-10 py-3.5 text-sm text-white placeholder-[#2e2e48] font-mono outline-none"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444460] hover:text-[#00ff9d] transition-colors"
          >
            <EyeIcon open={showPw} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const SignUp = () => {
  const { formData, handleChange, executeSignUp, loading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await executeSignUp();
    } catch (err) {
      console.log(err);
    }
  };
