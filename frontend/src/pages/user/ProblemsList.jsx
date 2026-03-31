import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);

  async function listOfProblem() {
    try {
      const response = await api.get("/problems/");
      setProblems(response.data.data);
    } catch (err) {
      //   setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    listOfProblem();
  }, []);

  return (
    <div>
      {Array.isArray(problems) && problems.length > 0 && (
        <div>
          {problems.map((p) => (
            <Link
              key={p._id}
              to={`/problems/${p.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px",
                  cursor: "pointer",
                }}
              >
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemsList;
