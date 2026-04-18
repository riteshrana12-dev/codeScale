import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api.js";

// ── Build a full 52-week grid from today backwards ──────────────────────────
function buildWeeks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // go back to the most recent Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - 51 * 7);

  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      week.push(date);
    }
    weeks.push(week);
  }
  return { weeks, today };
}

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function buildMap(data) {
  const map = {};
  (data || []).forEach(({ date, totalSubmission }) => {
    map[date] = totalSubmission;
  });
  return map;
}

// ── Color levels: 0 = empty, 1-4 = intensity ────────────────────────────────
const LEVELS = [
  { min: 0, max: 0, bg: "#0f0f1e", border: "#1A3263" },
  { min: 1, max: 2, bg: "#065f36", border: "#065f36" },
  { min: 3, max: 5, bg: "#047857", border: "#047857" },
  { min: 6, max: 9, bg: "#00c974", border: "#00c974" },
  { min: 10, max: Infinity, bg: "#00ff9d", border: "#00ff9d" },
];

function getLevel(count) {
  return LEVELS.findIndex((l) => count >= l.min && count <= l.max);
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
