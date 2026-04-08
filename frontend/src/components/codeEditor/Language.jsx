import { useState, useRef, useEffect } from "react";
import { useProblem } from "../../context/ProblemContext";
import { motion, AnimatePresence } from "framer-motion";

const Language = () => {
  const { solution, setSolution } = useProblem();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = ["JavaScript", "Python"];