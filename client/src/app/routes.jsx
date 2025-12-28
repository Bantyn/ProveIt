// Authanication
import Login from "../features/auth/login/Login.jsx";
import ClientSignup from "../features/auth/signup/client/ClientSignup";

// Pages
import Home from "../features/pages/home/Home";
import Landing from "../features/pages/landing/Landing";
import About from "../features/pages/about/About";
import EmployeeProfile from "../features/pages/profile/EmployeeProfile";
import ErrorFallback from "./ErrorFallback.jsx";

export const routes = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup/clientSignup",
        element: <ClientSignup />,
    },
    {
        path: "/profile",
        element: <EmployeeProfile />,
    },
    {
        path: "*",
        element: <ErrorFallback />
    }
];
