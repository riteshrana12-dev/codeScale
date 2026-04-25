import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api.js";

// Existing components
import ActivityMap from "../../components/ActivityMap.jsx";
import Leaderboard from "../../components/Leaderboard.jsx";
import RecentSubmissions from "../../components/RecentSubmission.jsx";

// New dashboard-specific components
import StatsOverview from "../../components/charts/StatsOverview.jsx";
import SubmissionChart from "../../components/charts/SubmissionChart.jsx";
import DashboardSkeleton from "../../components/charts/DashboardSkeleton.jsx";

// Section wrapper with fade-in
const Section = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay }}
  >
    {children}
  </motion.div>
);

// Dashboard header
const DashboardHeader = ({ dashboard }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start justify-between"
    >
      <div>
        <p className="font-mono text-[11px] text-[#444460] uppercase tracking-[0.2em]">
          {greeting}
        </p>
        <h1 className="font-mono text-2xl font-black text-white mt-0.5 tracking-tight">
          Your Dashboard
        </h1>
      </div>

      {dashboard && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d1a] border border-white/5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
          <span className="font-mono text-xs text-[#555575]">
            {dashboard.points.totalPoints.toLocaleString()} pts total
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Main page
const UserDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get("/analytics/");
        setDashboard(response.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#060610] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#f87171]/10 border border-[#f87171]/20 flex items-center justify-center mx-auto">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="font-mono text-sm text-[#f87171]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-mono text-xs text-[#555575] hover:text-white transition-colors"
          >
            Try again →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Subtle radial glow at top */}
      <div
        className="fixed top-14 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,255,157,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Header */}
        <DashboardHeader dashboard={dashboard} />

        {/* Row 1: Stats Overview - donut chart, points card, streak */}
        <Section delay={0.05}>
          <StatsOverview dashboard={dashboard} />
        </Section>

        {/* Row 2: Submission results bar chart + Activity heatmap */}
        <Section delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SubmissionChart submissionRaw={dashboard?.submissionRaw} />
            <ActivityMap />
          </div>
        </Section>

        {/* Row 3: Recent Submissions (wider) + Leaderboard */}
        <Section delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RecentSubmissions />
            </div>
            <Leaderboard />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default UserDashboard;
