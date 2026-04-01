import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserDashboard from "./pages/user/userDashboard";
import ProblemsList from "./pages/user/ProblemsList";
import ProblemSelected from "./components/codeEditor/ProblemSelected";
import { ProblemProvider } from "./context/ProblemContext";
const App = () => {
  return (
    <ProblemProvider>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/problems" element={<ProblemsList />} />
        <Route path="/problems/:slug" element={<ProblemSelected />} />
      </Routes>
    </ProblemProvider>
  );
};

export default App;
