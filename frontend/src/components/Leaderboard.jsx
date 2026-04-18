import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api.js";

const RANK_CONFIG = {
  1: {
    color: "#facc15",
    glow: "rgba(250,204,21,0.4)",
    bg: "rgba(250,204,21,0.08)",
    label: "1st",
    crown: true,
  },
  2: {
    color: "#c0c0c0",
    glow: "rgba(192,192,192,0.3)",
    bg: "rgba(192,192,192,0.06)",
    label: "2nd",
    crown: false,
  },
  3: {
    color: "#cd7f32",
    glow: "rgba(205,127,50,0.35)",
    bg: "rgba(205,127,50,0.07)",
    label: "3rd",
    crown: false,
  },
};
