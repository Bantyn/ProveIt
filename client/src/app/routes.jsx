// Authanication
import Login from "../features/auth/login/Login";
import ClientSignup from "../features/auth/signup/client/ClientSignup";
import CompanySignup from "../features/auth/signup/company/CompanySignup";
import CompanySignin from "../features/auth/signup/company/CompanyAuth/Logn";
import PlanSelection from "../features/auth/signup/company/PricingSection";

// import register from "../features/pages/CompanyAuth/Register"

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
    element: <CompanySignup />,
  },

  {
    path: "/signup/companySignin",
    element: <CompanySignin />,
  },

   {
    path: "/signup/companySignup/plan_selection",
    element: <PlanSelection />,
  }
];
