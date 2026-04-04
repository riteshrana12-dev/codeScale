import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSignIn from "../../hooks/signIn";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

const SignIn = () => {
  const navigate = useNavigate();
  const { formData, handleChange, executeSignUp, error, loading } = useSignIn();
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await executeSignUp();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,157,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.06)_0%,transparent_65%)] pointer-events-none" />

      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#00ff9d] pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -40, -80] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00ff9d]/20 via-transparent to-[#00d4ff]/10 blur-sm" />
        <div className="relative bg-[#0d0d1a]/90 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00ff9d]/60 to-transparent" />
        <div className="px-8 pt-10 pb-10">
          <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                  <span className="font-mono text-[#00ff9d] text-sm font-bold">
                    &gt;_
                  </span>
                </div>
                <span className="font-mono text-white text-lg font-semibold tracking-wide">
                  DevJudge
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Welcome back.
              </h1>
              <p className="text-[#555570] text-sm font-mono">
                <span className="text-[#00ff9d]">$</span> sign in to continue solving
              </p>
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <label className="block font-mono text-xs text-[#555570] mb-2 tracking-widest uppercase">
                  Email
                </label>
                <div
                  className={`relative rounded-lg border transition-all duration-300 ${
                    focused === "email"
                      ? "border-[#00ff9d]/50 bg-[#00ff9d]/5 shadow-[0_0_20px_rgba(0,255,157,0.08)]"
                      : "border-white/8 bg-white/3 hover:border-white/15"
                  }`}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={focused === "email" ? "#00ff9d" : "#444460"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    placeholder="abc123@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent pl-10 pr-4 py-3.5 text-sm text-white placeholder-[#333350] font-mono outline-none"
                    autoComplete="email"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.5 }}
              >
                <div
                  className={`relative rounded-lg border transition-all duration-300 ${
                    focused === "password"
                      ? "border-[#00ff9d]/50 bg-[#00ff9d]/5 shadow-[0_0_20px_rgba(0,255,157,0.08)]"
                      : "border-white/8 bg-white/3 hover:border-white/15"
                  }`}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={focused === "password" ? "#00ff9d" : "#444460"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent pl-10 pr-12 py-3.5 text-sm text-white placeholder-[#333350] font-mono outline-none"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444460] hover:text-[#00ff9d] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 bg-[#f87171]/8 border border-[#f87171]/20 rounded-lg px-4 py-3"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="font-mono text-xs text-[#f87171]">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group overflow-hidden rounded-lg py-3.5 font-mono font-black text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: loading ? "#1a2e24" : undefined }}
                >
                  {!loading && (
                    <div className="absolute inset-0 bg-[#00ff9d] group-hover:bg-[#00e88a] transition-colors duration-200" />
                  )}
                  {loading && (
                    <div className="absolute inset-0 bg-[#00ff9d]/10 border border-[#00ff9d]/20" />
                  )}
                  <span
                    className={`relative z-10 flex items-center justify-center gap-2 ${loading ? "text-[#00ff9d]" : "text-[#0a0a0f]"}`}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-3.5 h-3.5 border-2 border-[#00ff9d]/30 border-t-[#00ff9d] rounded-full"
                        />
                        signing in...
                      </>
                    ) : (
                      "Sign In →"
                    )}
                  </span>
                </button>
              </motion.div>
            </form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 my-7"
            >
              <div className="flex-1 h-px bg-white/5" />
              <span className="font-mono text-xs text-[#333350]">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-center font-mono text-sm text-[#444460]"
            >
              No account?{" "}
              
                href="/signup"
                className="text-[#00ff9d] hover:text-[#00e88a] transition-colors font-bold"
              >
                Create one →
              </a>
            </motion.p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};
export default SignIn;