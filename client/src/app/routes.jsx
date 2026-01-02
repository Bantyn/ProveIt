// Authanication
import Login from "../pages/auth/login/Login";
import ClientSignup from "../pages/auth/signup/client/ClientSignup";
import CompanySignup from "../pages/auth/signup/company/CompanySignup";
import EmployeeProfile from "../pages/Emplyee_UI/profile/Profile";

// Pages
<<<<<<< HEAD
import Home from "../features/pages/Emplyee_UI/dashboard/EmplyeeDashboard";
import Landing from "../features/pages/landing/Landing";
// import { Contact } from "lucide-react";
import Contact from "../features/pages/Contact/Contact";
=======
import Home from "../pages/Emplyee_UI/dashboard/EmplyeeDashboard";
import Landing from "../pages/landing/Landing";
import Maintaince from "../pages/maintaince/Maintaince.jsx";
>>>>>>> 5eead8797d3c3d793b36e512844095c78c7d6ed4


export const routes = [
   {
    path: "/",
    element: <Landing />,
  },
   {
    path: "/maintaince",
    element: <Maintaince />,
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
    path: "/signup/EmployeeSignup",
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
