import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Dashboard";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adminDashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
]);
