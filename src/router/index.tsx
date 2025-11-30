import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout";
import Login from "../pages/Login";
import History from "../pages/History";
import Help from "../pages/Help";
import SignUp from "../pages/SignUp";
import ForgetPassword from "../pages/ForgetPassword";
import ProtectedRoute from "./routerGuard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      { path: "/help", element: <Help /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },
    ],
  },
]);
