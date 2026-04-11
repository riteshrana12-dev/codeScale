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
      <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="w-px h-4 bg-white/10" />
        <span className="font-mono text-xs text-[#444460]">solution.js</span>
        <div className="ml-auto flex items-center gap-2">
          <Language />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Write your solution here !imp Use camel case for function name"
          theme="vs-dark"
          value={solution.code}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            lineNumbers: "on",
            renderLineHighlight: "all",
            cursorBlinking: "smooth",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            padding: { top: 16, bottom: 16 },
          }}