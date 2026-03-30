import signUp from "../services/signUp.service.js";
import { useState } from "react";

const useSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const executeSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await signUp(formData);
      return response;
    } catch (err) {
      setError(err.response?.data.message || "signUp Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, executeSignUp, error, loading };
};

export default useSignUp;
