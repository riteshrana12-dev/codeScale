import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserDashboard from "./pages/user/userDashboard";
import ProblemsList from "./pages/ProblemsList";
// import ProblemSelected from "./components/codeEditor/ProblemSelected";
import ProblemPage from "./pages/ProblemPage";
import { ProblemProvider } from "./context/ProblemContext";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <ProblemProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/problems" element={<ProblemsList />} />
        <Route path="/problems/:slug" element={<ProblemPage />} />
      </Routes>
    </ProblemProvider>
  );
};

export default App;
