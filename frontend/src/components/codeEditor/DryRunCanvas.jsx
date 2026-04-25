import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
const DryRunCanvas = ({ onClose, problemId }) => {
  const canvasRef = useRef(null);