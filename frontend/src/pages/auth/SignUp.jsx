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
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,255,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,157,0.06)_0%,transparent_65%)] pointer-events-none " />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#00d4ff" : "#00ff9d",
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.35, 0], y: [0, -50, -100] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glow border */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00d4ff]/15 via-transparent to-[#00ff9d]/15 blur-sm" />

        <div className="relative bg-[#0d0d1a]/90 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden">
          {/* Top line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

          <div className="px-8 pt-9 pb-9">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                  <span className="font-mono text-[#00ff9d] text-sm font-bold">
                    &gt;_
                  </span>
                </div>
                <span className="font-mono text-white text-lg font-semibold tracking-wide">
                  CodeScale
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Create account.
              </h1>
              <p className="text-[#555570] text-sm font-mono">
                <span className="text-[#00d4ff]">$</span> join and start solving
                problems
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First + Last name row */}
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="First name"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  delay={0.2}
                  icon={
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
                <InputField
                  label="Last name"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  delay={0.26}
                  icon={
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
              </div>

              {/* Email */}
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="abc123@gmail.com"
                value={formData.email}
                onChange={handleChange}
                delay={0.32}
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />

              {/* Password */}
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                delay={0.38}
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />

              {/* Password strength hint */}
              {formData.password?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 pt-0.5"
                >
                  {[1, 2, 3, 4].map((seg) => {
                    const len = formData.password.length;
                    const strength =
                      len < 6 ? 1 : len < 10 ? 2 : len < 14 ? 3 : 4;
                    const colors = ["#f87171", "#fb923c", "#facc15", "#00ff9d"];
                    return (
                      <div
                        key={seg}
                        className="h-0.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            seg <= strength ? colors[strength - 1] : "#1e1e2e",
                        }}
                      />
                    );
                  })}
                  <span className="font-mono text-xs text-[#444460] ml-1 w-14">
                    {formData.password.length < 6
                      ? "weak"
                      : formData.password.length < 10
                      ? "fair"
                      : formData.password.length < 14
                      ? "good"
                      : "strong"}
                  </span>
                </motion.div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 bg-[#f87171]/8 border border-[#f87171]/20 rounded-lg px-4 py-3"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="font-mono text-xs text-[#f87171] ">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.5 }}
                className="pt-1"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group overflow-hidden rounded-lg py-3.5 font-mono font-black text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {!loading && (
                    <div className="absolute inset-0 bg-[#00ff9d] group-hover:bg-[#00e88a] transition-colors duration-200" />
                  )}
                  {loading && (
                    <div className="absolute inset-0 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-lg" />
                  )}
                  <span
                    className={`relative z-10 flex items-center justify-center gap-2 ${loading ? "text-[#00ff9d]" : "text-[#0a0a0f]"}`}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block w-3.5 h-3.5 border-2 border-[#00ff9d]/30 border-t-[#00ff9d] rounded-full"
                        />
                        creating account...
                      </>
                    ) : (
                      "Create Account →"
                    )}
                  </span>
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/5" />
              <span className="font-mono text-xs text-[#2e2e48]">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
      </motion.div>
   
