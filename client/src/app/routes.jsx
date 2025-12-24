// Authanication
import Login from "../features/auth/login/Login";
import ClientSignup from "../features/auth/signup/client/ClientSignup";
import CompanySignup from "../features/auth/signup/company/CompanySignup";
import EmployeeProfile from "../features/pages/Emplyee_UI/profile/Profile";

// Pages
import Home from "../features/pages/Emplyee_UI/dashboard/EmplyeeDashboard";
import Landing from "../features/pages/landing/Landing";
// import { Contact } from "lucide-react";
import Contact from "../features/pages/Contact/Contact";


export const routes = [
   {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/client/emplyee_dashboard",
    element: <Home />,
  },
  {
    path: "/masterLogin",
    element: <Login />,
  },
  {
<<<<<<< HEAD
    path: "/signup/clientSignup",
=======
    path: "/signup/EmployeeSignup",
>>>>>>> kishan
    element: <ClientSignup />,
  },
  {
    path: "/signup/companySignup",
    element: <CompanySignup />,
  },
  {
    path: "/employee/employeeProfile",
    element: <EmployeeProfile />,
  },
  {
    path: "/contact",
    element: <Contact />,
  }
];
