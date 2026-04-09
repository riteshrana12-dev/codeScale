import React from "react";
import { motion } from "framer-motion";

const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <div
      className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pb-10 mb-10"
      >