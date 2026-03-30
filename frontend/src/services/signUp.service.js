import api from "../api/api.js";

const signUp = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export default signUp;
