import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
const DryRunCanvas = ({ onClose, problemId }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen"); // pen, eraser, pan
  const [strokeColor, setStrokeColor] = useState("#00d4ff");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(20);

  const storageKey = `sketch_cache_${problemId || "global"}`;
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData && canvasRef.current) {
      setTimeout(() => {
        canvasRef.current.loadPaths(JSON.parse(savedData));
      }, 150);
    }
  }, [storageKey]);

  const handleStroke = () => {
    canvasRef.current
      .exportPaths()
      .then((paths) => localStorage.setItem(storageKey, JSON.stringify(paths)))
      .catch((e) => console.error(e));
  };

  const handleClear = () => {
    if (window.confirm("Clear entire board?")) {
      canvasRef.current.clearCanvas();
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-2">
      <div className="w-full h-full bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* TOP TOOLBAR */}
        <div className="px-6 py-3 border-b border-white/5 bg-[#161625] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">