import { useState, useRef, useEffect } from "react";
import { useProblem } from "../../context/ProblemContext";
import { motion, AnimatePresence } from "framer-motion";

const Language = () => {
  const { solution, setSolution } = useProblem();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = ["JavaScript", "Python"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>