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