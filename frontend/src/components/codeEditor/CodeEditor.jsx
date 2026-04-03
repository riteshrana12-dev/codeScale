import { useRef } from "react";
import Editor from "@monaco-editor/react";
import Language from "./Language";
import { useProblem } from "../../context/ProblemContext";
import RunCodeButton from "./RunCodeButton";
import SubmitCodeButton from "./SubmitButton";
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
        <RunCodeButton>▶ Run Code</RunCodeButton>

        <SubmitCodeButton>Submit</SubmitCodeButton>
        {/* 2. Output Panel (Displaying context result) */}

        {/* SHOW LOADING STATE */}
        {/* --- OUTPUT SECTION --- */}

        {/* 1. LOADING STATE (Combined into one block for cleanliness) */}
        {isLoading && (
          <div
            style={{
              marginTop: "20px",
              padding: "24px",
              background: "#1e1e1e",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #333",
            }}
          >
            <div
              className="spinner"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              ⚙️
            </div>
            <div
              style={{
                color: "#aaa",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              Executing code against test cases...
            </div>
          </div>
        )}

        {/* 2. SUBMITTED SUCCESS UI (Shows only when submit is explicitly true) */}
        {!isLoading && submit === true && (
          <div
            style={{
              marginTop: "20px",
              padding: "30px",
              background: "#1e1e1e",
              borderRadius: "8px",
              border: "1px solid #28c840",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🚀</div>
            <h3 style={{ color: "#28c840", margin: 0, fontSize: "22px" }}>
              Solution Submitted Successfully!
            </h3>
            <p style={{ color: "#aaa", fontSize: "14px", marginTop: "8px" }}>
              Great job! Your stats and streak have been updated in the
              database.
            </p>
          </div>
        )}

        {/* 3. RUN TEST RESULTS UI (Shows only if NOT in submit mode) */}
        {/* Change: We check strictly that submit is NOT true to avoid overlapping UI */}
        {!isLoading && submit !== true && submission && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              background: "#1e1e1e",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
          >
            <h3
              style={{
                color: submission.allPassed ? "#28c840" : "#ff5f57",
                marginTop: 0,
                fontSize: "18px",
              }}
            >
              {submission.allPassed ? "✅ Passed" : "❌ Failed"}
            </h3>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {submission?.results?.map((result, index) => (
                <div
                  key={index}
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
                    Case {index + 1}:{" "}
                    {result.status ? result.status.toUpperCase() : "FAILED"}
                  </div>

                  {result.status !== "error" && (
                    <div
                      style={{
                        fontSize: "13px",
                        marginTop: "8px",
                        color: "#ccc",
                        fontFamily: "monospace",
                      }}
                    >
                      {/* DYNAMIC INPUT RENDERING: Handles any variable names (nums, target, l1, etc.) */}
                      <div style={{ marginBottom: "4px" }}>
                        <strong style={{ color: "#888" }}>Input: </strong>
                        {Object.entries(result.input).map(([key, value], i) => (
                          <span key={key}>
                            <span style={{ color: "#569cd6" }}>{key}</span>:{" "}
                            <span style={{ color: "#ce9178" }}>
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </span>
                            {/* Add comma separator between arguments */}
                            {i < Object.entries(result.input).length - 1 &&
                              " , "}
                          </span>
                        ))}
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
                          {typeof result.output === "string"
                            ? result.output
                            : JSON.stringify(result.output)}
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: "#888" }}>Expected: </strong>
                        {JSON.stringify(result.expectedOutput)}
                      </div>
                    </div>
                  )}

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
