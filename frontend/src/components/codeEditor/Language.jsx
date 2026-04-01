import { useProblem } from "../../context/ProblemContext";

const Language = () => {
  const { solution, setSolution } = useProblem();
  const language = ["Javascript", "Python"];

  return (
    <select
      name="selectedLanguage"
      onChange={(e) => setSolution({ ...solution, language: e.target.value })}
    >
      {language.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default Language;
