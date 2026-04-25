import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api.js";

const STATUS_CONFIG = {
  accepted: {
    label: "Accepted",
    color: "#00ff9d",
    bg: "rgba(0,255,157,0.08)",
    border: "rgba(0,255,157,0.2)",
  },
  wrong_answer: {
    label: "Wrong Answer",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
};

const SubmissionsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/user/history/detailview/${id}`);
        setSubmission(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#05050a]" />;