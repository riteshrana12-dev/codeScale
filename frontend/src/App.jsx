import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserDashboard from "./pages/user/userDashboard";
import ProblemsList from "./pages/user/ProblemsList";

const App = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/problems" element={<ProblemsList />} />
    </Routes>
  );
};

export default App;
