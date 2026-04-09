import React from "react";
import { motion } from "framer-motion";

const ProblemDescription = ({ problem }) => {
  if (!problem) return null;