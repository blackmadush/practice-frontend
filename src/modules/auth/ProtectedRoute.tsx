import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/hooks";
import { authDataService } from "../../services/data/authDataService";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = authDataService.jwtToken?.length > 0;
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
