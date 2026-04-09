import React from "react";
import { motion } from "framer-motion";

const ProblemDescription = ({ problem }) => {
  if (!problem) return null;

  return (
    <div
      className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >