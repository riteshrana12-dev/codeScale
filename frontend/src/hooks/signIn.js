import signIn from "../services/signIn.service.js";
import { useState } from "react";

const useSignIn = () => {
  const [formData, setFormData] = useState({
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
      const response = await signIn(formData);
      return response;
    } catch (err) {
      setError(err.response?.data.message || "signIn Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, executeSignUp, error, loading };
};

export default useSignIn;
