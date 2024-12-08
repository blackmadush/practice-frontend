import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginForm from "./modules/auth/components/LoginForm";
import Dashboard from "./modules/dashboard/components/Dashboard";
import { authDataService } from "./services/data/authDataService";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authDataService.jwtToken?.length > 0
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(authDataService.jwtToken?.length > 0);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const ProtectedRoute = () => {
    const isAuthenticated = Boolean(authDataService.jwtToken?.length > 0);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
