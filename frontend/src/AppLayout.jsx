import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

/**
 * AppLayout wraps all authenticated pages.
 * Use this as a parent <Route> in App.jsx — child routes render via <Outlet />.
 *
 * Example in App.jsx:
 *   <Route element={<AppLayout />}>
 *     <Route path="/dashboard" element={<UserDashboard />} />
 *     <Route path="/problems"  element={<ProblemsList />} />
 *     ...
 *   </Route>
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#060610]">
      <Navbar />
      <Outlet />
    </div>
  );
}
