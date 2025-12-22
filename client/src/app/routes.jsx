// Authanication
import Login from "../features/auth/login/Login.jsx";
import ClientSignup from "../features/auth/signup/client/ClientSignup";
import CompanySignup from "../features/auth/signup/company/CompanySignup";

// Pages
import Home from "../features/pages/home/Home";
import Landing from "../features/pages/landing/Landing";
import About from "../features/pages/about/About";


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
    path: "/signup/companySignup",
    element: <CompanySignup />,
  }
];
