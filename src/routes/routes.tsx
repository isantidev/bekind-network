import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@pages/Login";
import { authLoader, protectedLoader } from "@utils/ProtectedRoutes";
import DashboardPage from "@pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/login",
        loader: authLoader,
        element: <LoginPage />,
    },
    {
        path: "/",
        loader: protectedLoader,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
        ],
    },
]);
