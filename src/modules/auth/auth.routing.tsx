import React from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "../dashboard/components/Dashboard";

export const authRoutes = {
  routes: [
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ],
};
