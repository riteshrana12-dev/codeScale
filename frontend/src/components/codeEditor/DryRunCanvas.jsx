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