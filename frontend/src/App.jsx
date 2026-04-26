import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import ProblemsList from "./pages/ProblemsList.jsx";
// import ProblemSelected from "./components/codeEditor/ProblemSelected";
import ProblemPage from "./pages/ProblemPage.jsx";
import { ProblemProvider } from "./context/ProblemContext.jsx";
import HomePage from "./pages/HomePage";
import SubmissionsHistory from "./pages/SubmissionHistory.jsx";
import SubmissionsDetail from "./pages/SubmissionDetail.jsx";
import ChatBot from "./components/chatbot/Chatbot.jsx";
import AppLayout from "./AppLayout.jsx";
import MyAccount from "./pages/user/MyAccount.jsx";
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
