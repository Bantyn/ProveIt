// Authanication
import Login from "../features/auth/login/Login";
import ClientSignup from "../features/auth/signup/client/ClientSignup";
import CompanySignin from "../features/auth/signup/company/CompanySignin";

// Pages
import Home from "../features/pages/home/Home";
import Landing from "../features/pages/landing/Landing";


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
    path: "/masterLogin",
    element: <Login />,
  },
  {
    path: "/signup/clientSignup",
    element: <ClientSignup />,
  },
  {
    path: "/signup/companySignup",
    element: <CompanySignin />,
  }
];
