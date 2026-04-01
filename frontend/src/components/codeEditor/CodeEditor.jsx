import { useRef } from "react";
import Editor from "@monaco-editor/react";
import Language from "./Language";
import { useProblem } from "../../context/ProblemContext";
import RunCodeButton from "./RunCodeButton";
function CodeEditor() {
  const { solution, setSolution, submissionResult, isLoading } = useProblem();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  const submission = submissionResult?.submission;

  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            background: "#2d2d2d",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #3e3e3e",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              background: "#3c3c3c",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #555",
            }}
          >
            <Language />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#febc2e",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#28c840",
                display: "inline-block",
              }}
            />
            <span style={{ marginLeft: 8, color: "#aaa", fontSize: 13 }}>
              solution.js
            </span>
          </div>

          {/* Monaco Editor */}
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            defaultValue="// Write your solution here !imp Use camel case for function name"
            theme="vs-dark"
            value={solution.code}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              lineNumbers: "on",
              renderLineHighlight: "all",
              cursorBlinking: "smooth",
            }}
            onChange={(value) => {
              setSolution({ ...solution, code: value });
            }}
          />
        </div>

        {/* Run Button */}
        <RunCodeButton
          style={{
            marginTop: 12,
            padding: "10px 28px",
            background: "#0e7a0e",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#12a012")}
          onMouseOut={(e) => (e.target.style.background = "#0e7a0e")}
        >
          ▶ Run Code
        </RunCodeButton>

        {/* 2. Output Panel (Displaying context result) */}

        {/* SHOW LOADING STATE */}
        {isLoading && (
          <div
            style={{
              padding: "24px",
              background: "#1e1e1e",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #333",
            }}
          >
            <div className="spinner" style={{ marginBottom: "10px" }}>
              ⚙️
            </div>
            <div
              style={{
                color: "#aaa",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              Executing your code against test cases...
            </div>
          </div>
        )}

        {/* SHOW RESULTS (Only when not loading and submission exists) */}
        {!isLoading && submission && (
          <div
            style={{
              padding: "16px",
              background: "#1e1e1e",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
          >
            <h3
              style={{
                color: submission.statue === "accepted" ? "#28c840" : "#ff5f57",
                marginTop: 0,
                fontSize: "18px",
              }}
            >
              {submission.statue === "accepted"
                ? "✅ Accepted"
                : `❌ ${submission.statue.toUpperCase()}`}
            </h3>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {submission.testCaseResults.map((result, index) => (
                <div
                  key={result._id || index}
                  style={{
                    marginBottom: "12px",
                    padding: "12px",
                    background: "#2d2d2d",
                    borderLeft: `4px solid ${
                      result.status === "passed" ? "#28c840" : "#ff5f57"
                    }`,
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: result.status === "passed" ? "#28c840" : "#ff5f57",
                    }}
                  >
                    Case {index + 1}: {result.status.toUpperCase()}
                  </div>

                  {/* If it passed or failed (but didn't error), show input/output */}
                  {result.status !== "error" && (
                    <div
                      style={{
                        fontSize: "13px",
                        marginTop: "8px",
                        color: "#ccc",
                        fontFamily: "monospace",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        <strong style={{ color: "#888" }}>Input: </strong>
                        {JSON.stringify(result.input)}
                      </div>
                      <div style={{ marginBottom: "4px" }}>
                        <strong style={{ color: "#888" }}>Output: </strong>
                        <span
                          style={{
                            color:
                              result.status === "passed"
                                ? "#28c840"
                                : "#ff5f57",
                          }}
                        >
                          {result.output}
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: "#888" }}>Expected: </strong>
                        {JSON.stringify(result.expectedOutput)}
                      </div>
                    </div>
                  )}

                  {/* If it errored, show the error message */}
                  {result.status === "error" && (
                    <div
                      style={{
                        fontSize: "13px",
                        marginTop: "8px",
                        color: "#ff5f57",
                        background: "#3a1e1e",
                        padding: "8px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                      }}
                    >
                      <strong>Runtime Error:</strong>
                      <pre
                        style={{ margin: "4px 0 0 0", whiteSpace: "pre-wrap" }}
                      >
                        {result.output}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
