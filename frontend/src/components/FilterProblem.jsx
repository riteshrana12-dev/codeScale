import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DIFF_CONFIG = {
  Easy: { color: "#00ff9d", glow: "rgba(0,255,157,0.45)" },
  Medium: { color: "#facc15", glow: "rgba(250,204,21,0.45)" },
  Hard: { color: "#f87171", glow: "rgba(248,113,113,0.45)" },
};

const TAGS = [
  "Array",
  "String",
  "Hash Map",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Queue",
  "Linked List",
  "Binary Search",
  "Tree",
  "Binary Tree",
  "BST",
  "Graph",
  "BFS",
  "DFS",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Sorting",
  "Math",
  "Bit Manipulation",
  "Recursion",
  "Heap",
  "Trie",
  "Matrix",
];
