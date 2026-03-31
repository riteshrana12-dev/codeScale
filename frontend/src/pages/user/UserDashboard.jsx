import { useEffect, useState } from "react";
import api from "../../api/api.js";
// import UserHeatMap from "./userHeatMap.jsx";

const UserDashboard = () => {
  const [dashboard, setDashboard] = useState({});

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

  return (
    <div>
      {dashboard ? (
        <p>{JSON.stringify(dashboard)}</p>
      ) : (
        <p>No response empty</p>
      )}
      <hr />
      <h3>Activity Heatmap</h3>
      {/* Use the component that knows how to fetch its own data */}
      {/* <UserHeatMap /> */}
    </div>
  );
};

export default UserDashboard;
