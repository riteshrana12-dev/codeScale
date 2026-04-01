import { useProblem } from "../../context/ProblemContext";

const Language = () => {
  const { solution, setSolution } = useProblem();
  const language = ["JavaScript", "Python"];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <select
        name="selectedLanguage"
        value={solution.language}
        onChange={(e) => setSolution({ ...solution, language: e.target.value })}
        style={{
          padding: "6px 12px",
          fontSize: "14px",
          borderRadius: "6px",
          backgroundColor: "#2d2d2d",
          color: "#ffffff",
          border: "1px solid #444",
          outline: "none",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#007aff")}
        onBlur={(e) => (e.target.style.borderColor = "#444")}
      >
        {language.map((lang) => (
          <option
            key={lang}
            value={lang}
            style={{ backgroundColor: "#1e1e1e", color: "#fff" }}
          >
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Language;
