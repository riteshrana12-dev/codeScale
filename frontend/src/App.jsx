import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserDashboard from "./pages/user/userDashboard";
import ProblemsList from "./pages/ProblemsList";
// import ProblemSelected from "./components/codeEditor/ProblemSelected";
import ProblemPage from "./pages/ProblemPage";
import { ProblemProvider } from "./context/ProblemContext";
import HomePage from "./pages/HomePage";
import SubmissionsHistory from "./pages/SubmissionHistory";
import SubmissionsDetail from "./pages/SubmissionDetail";
import ChatBot from "./components/chatbot/Chatbot";
import AppLayout from "./AppLayout";
import MyAccount from "./pages/user/MyAccount";
const App = () => {
  return (
    <ProblemProvider>
      <Routes>
        {/* Public routes — no navbar */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />

        {/* Authenticated routes — wrapped in AppLayout (adds Navbar) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/problems" element={<ProblemsList />} />
          <Route path="/submissionshistory" element={<SubmissionsHistory />} />
          <Route
            path="/submissiondetailveiw/:id"
            element={<SubmissionsDetail />}
          />
          <Route path="/account" element={<MyAccount />} />
        </Route>
        <Route path="/problems/:slug" element={<ProblemPage />} />
      </Routes>
      <ChatBot />
    </ProblemProvider>
  );
};

export default App;
