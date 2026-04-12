import { useRef } from "react";
import Editor from "@monaco-editor/react";
import Language from "./Language";
import { useProblem } from "../../context/ProblemContext";
import RunCodeButton from "./RunCodeButton";
import SubmitCodeButton from "./SubmitButton";
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
      {/* Editor toolbar */}
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

      {/* Monaco Editor — fills remaining space */}
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
          onChange={(value) => setSolution({ ...solution, code: value })}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0f0f1e] border-t border-white/5 flex-shrink-0">
        <RunCodeButton />
        <SubmitCodeButton />
        {isLoading && (
          <div className="ml-auto flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-3.5 h-3.5 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full"
            />
            <span className="font-mono text-xs text-[#555570]">
              executing...
            </span>
          </div>
        )}
      </div>

      {/* Output Panel */}
      <AnimatePresence mode="wait">
        {/* LOADING */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/5 bg-[#0d0d1a] px-5 py-6 flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full flex-shrink-0"
              />
              <div>
                <p className="font-mono text-sm text-white">
                  Executing code...
                </p>
                <p className="font-mono text-xs text-[#555570] mt-0.5">
                  Running against test cases in sandbox
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBMITTED SUCCESS */}
        {!isLoading && submit === true && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="border-t border-[#00ff9d]/20 bg-[#00ff9d]/5 px-5 py-6 flex-shrink-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00ff9d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-mono font-black text-[#00ff9d] text-base">
                  Submitted
                </h3>
              </div>
            </div>
          </motion.div>
        )}

        {/* RUN RESULTS */}
        {!isLoading && submit !== true && submission && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/5 bg-[#0d0d1a] flex-shrink-0"
            style={{ maxHeight: "38vh" }}
          >
            {/* Results header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
              <div
                className={`flex items-center gap-2 font-mono text-sm font-bold ${
                  submission.allPassed ? "text-[#00ff9d]" : "text-[#f87171]"
                }`}
              >
                {submission.allPassed ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
                {submission.allPassed
                  ? "All cases passed"
                  : "Some cases failed"}
              </div>
              <div className="ml-auto flex gap-2">
                {submission?.results?.map((r, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold ${
                      r.status === "passed"
                        ? "bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20"
                        : "bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/20"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Test case results */}
            <div
              className="overflow-y-auto [&::-webkit-scrollbar]:hidden"
              style={{
                maxHeight: "28vh",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {submission?.results?.map((result, index) => (
                <div
                  key={index}
                  className={`mx-4 my-3 rounded-xl border overflow-hidden ${
                    result.status === "passed"
                      ? "border-[#00ff9d]/15 bg-[#00ff9d]/3"
                      : "border-[#f87171]/15 bg-[#f87171]/3"
                  }`}
                >
                  {/* Case header */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 border-b ${
                      result.status === "passed"
                        ? "border-[#00ff9d]/10"
                        : "border-[#f87171]/10"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${
                        result.status === "passed"
                          ? "text-[#00ff9d]"
                          : "text-[#f87171]"
                      }`}
                    >
                      Case {index + 1} ·{" "}
                      {result.status ? result.status.toUpperCase() : "FAILED"}
                    </span>
                  </div>

                  {result.status !== "error" && (
                    <div className="px-4 py-3 space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#444460] w-18 flex-shrink-0 pt-0.5">
                          Input
                        </span>
                        <code className="font-mono text-xs text-[#9999b0] leading-relaxed flex-1">
                          {Object.entries(result.input).map(
                            ([key, value], i) => (
                              <span key={key}>
                                <span style={{ color: "#569cd6" }}>{key}</span>
                                {": "}
                                <span style={{ color: "#ce9178" }}>
                                  {typeof value === "object"
                                    ? JSON.stringify(value)
                                    : String(value)}
                                </span>
                                {i < Object.entries(result.input).length - 1 &&
                                  ", "}
                              </span>
                            ),
                          )}
                        </code>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#444460] w-18 flex-shrink-0 pt-0.5">
                          Output
                        </span>
                        <code
                          className="font-mono text-xs leading-relaxed"
                          style={{
                            color:
                              result.status === "passed"
                                ? "#00ff9d"
                                : "#f87171",
                          }}
                        >
                          {typeof result.output === "string"
                            ? result.output
                            : JSON.stringify(result.output)}
                        </code>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#444460] w-18 flex-shrink-0 pt-0.5">
                          Expected
                        </span>
                        <code className="font-mono text-xs text-[#9999b0] leading-relaxed">
                          {JSON.stringify(result.expectedOutput)}
                        </code>
                      </div>
                    </div>
                  )}

                  {result.status === "error" && (
                    <div className="px-4 py-3">
                      <div className="bg-[#f87171]/5 border border-[#f87171]/10 rounded-lg p-3">
                        <p className="font-mono text-xs text-[#f87171] font-bold mb-1">
                          Runtime Error
                        </p>
                        <pre className="font-mono text-xs text-[#f87171]/70 whitespace-pre-wrap leading-relaxed">
                          {result.output}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CodeEditor;
