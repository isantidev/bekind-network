import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@pages/Login";
import { authLoader, protectedLoader } from "@utils/ProtectedRoutes";
import { Layout } from "@pages/Layout";
import DashboardPage from "@pages/Dashboard";

// Importar otras páginas según sea necesario
/* 
import ImpactoSocialPage from "@pages/ImpactoSocial";
import ComunidadPage from "@pages/Comunidad";
import SponsorsPage from "@pages/Sponsors";
import MarketplacePage from "@pages/Marketplace";
import BakanesPage from "@pages/Bakanes";
import ContenidosPage from "@pages/Contenidos";
import CategoriasDeAccionesPage from "@pages/CategoriasDeAcciones"; 
*/

export const router = createBrowserRouter([
    {
        path: "/login",
        loader: authLoader,
        element: <LoginPage />,
    },
    {
        path: "/",
        loader: protectedLoader,
        element: <Layout />,
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
