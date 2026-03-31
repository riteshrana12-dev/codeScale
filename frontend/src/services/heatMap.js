import api from "../api/api.js";

const heatMapresponse = async () => {
  const response = await api.get("/analytics/heatmap");
  console.log(response.data);
  return response.data;
};
export default heatMapresponse;
