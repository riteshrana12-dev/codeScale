import { useEffect, useState } from "react";
import api from "../../api/api.js";

const UserDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  async function Dashboard() {
    try {
      const response = await api.get("/analytics/");
      console.log(response.data);
      setDashboard(response.data);
    } catch (error) {
      console.log("Error fetching dashboard:", error);
    }
  }

  useEffect(() => {
    Dashboard();
  }, []);

  const getAcceptancePercentage = () => {
    if (!dashboard) return 0;
    const accepted =
      dashboard.submissionRaw.find((sub) => sub._id === "accepted")?.count || 0;

    const total = dashboard.points?.totalSubmissions || 0;
    return total > 0 ? ((accepted / total) * 100).toFixed(2) : 0;
  };
  return (
    <div>
      {dashboard ? (
        <div>
          <p>totalSolved:{dashboard.points.totalSolved}</p>
          <p>totalSubmissions:{dashboard.points.totalSubmissions}</p>
          <p>Acceptance : {getAcceptancePercentage()}%</p>
          <p>easySolved:{dashboard.points.easySolved}</p>
          <p>mediumSolved:{dashboard.points.mediumSolved}</p>
          <p>hardSolved:{dashboard.points.hardSolved}</p>
          <p>easyPoints:{dashboard.points.easyPoints}</p>
          <p>mediumPoints:{dashboard.points.mediumPoints}</p>
          <p>hardPoints:{dashboard.points.hardPoints}</p>
          <p>totalPoints:{dashboard.points.totalPoints}</p>
          <p>streak:{dashboard.activity.streak}</p>
          <p>maxStreak:{dashboard.activity.maxStreak}</p>
          <div>
            {dashboard.submissionRaw?.map((sub) => (
              <div key={sub._id}>
                <p>
                  {sub._id}:{sub.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDashboard;
