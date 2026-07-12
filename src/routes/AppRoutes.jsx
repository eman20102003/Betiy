import { Routes, Route } from "react-router-dom";
import {
  Landing,
  Login,
  SignUp,
  Dashboard,
  NotFound
} from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}
export default AppRoutes;