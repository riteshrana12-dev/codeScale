import api from "../api/api.js";

const signIn = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export default signIn;
