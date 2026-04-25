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
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  setTool("pen");
                  canvasRef.current.eraseMode(false);
                }}
                className={`p-2.5 rounded-lg transition-all ${tool === "pen" ? "bg-[#00d4ff] text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]" : "text-white/40 hover:text-white"}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setTool("eraser");
                  canvasRef.current.eraseMode(true);
                }}
                className={`p-2.5 rounded-lg transition-all ${tool === "eraser" ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]" : "text-white/40 hover:text-white"}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
                </svg>
              </button>

              <button
                onClick={() => setTool("pan")}
                className={`p-2.5 rounded-lg transition-all ${tool === "pan" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 px-4 border-l border-white/10">
              {["#00d4ff", "#00ff9d", "#facc15", "#ffffff"].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setStrokeColor(c);
                    setTool("pen");
                    canvasRef.current.eraseMode(false);
                  }}
                  className={`w-6 h-6 rounded-full border-2 ${strokeColor === c && tool === "pen" ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/30 font-bold uppercase">
                {tool === "eraser" ? "Eraser" : "Pen"}
              </span>
              <input
                type="range"
                min="1"
                max="60"
                value={tool === "eraser" ? eraserWidth : strokeWidth}
                onChange={(e) =>
                  tool === "eraser"
                    ? setEraserWidth(parseInt(e.target.value))
                    : setStrokeWidth(parseInt(e.target.value))
                }
                className="w-28 accent-[#00d4ff] cursor-pointer"
              />
              <span className="text-xs font-mono text-white/60 w-4">
                {tool === "eraser" ? eraserWidth : strokeWidth}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => canvasRef.current.undo()}
              className="p-2 text-white/40 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </button>
            <button
              onClick={handleClear}
              className="p-2 text-red-500/40 hover:text-red-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-6 py-2 bg-[#00d4ff] text-black font-bold rounded-xl hover:brightness-110 transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>

        {/* CANVAS AREA */}
        <div
          className={`flex-1 relative overflow-hidden ${tool === "pan" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"}`}
        >