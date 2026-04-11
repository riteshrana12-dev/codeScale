import { useRef } from "react";
import Editor from "@monaco-editor/react";
import Language from "./Language";
import RunCodeButton from "./RunCodeButton";
import SubmitCodeButton from "./SubmitButton";

import { useProblem } from "../../context/ProblemContext";
import { motion, AnimatePresence } from "framer-motion";

function CodeEditor() {
  const {
    solution,
    setSolution,
    submissionResult,
    submittedResult,
    isLoading,
  } = useProblem();

  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  const submission = submissionResult;
  const submit = submittedResult;
  return (
    <div className="flex flex-col h-full bg-[#0a0a0f]">
      <div className="flex items-center gap-3 px-4 h-11 bg-[#0f0f1e] border-b border-white/5 flex-shrink-0">