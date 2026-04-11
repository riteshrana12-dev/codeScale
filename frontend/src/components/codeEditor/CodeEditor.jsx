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