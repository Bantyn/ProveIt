// Authanication
import Login from "../pages/auth/login/Login";
import ClientSignup from "../pages/auth/signup/client/ClientSignup";
import CompanySignup from "../pages/auth/signup/company/CompanySignup";
import EmployeeProfile from "../pages/Emplyee_UI/profile/Profile";

// Pages
import Home from "../pages/Emplyee_UI/dashboard/EmplyeeDashboard";
import Landing from "../pages/landing/Landing";


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
    path: "/signup/clientSignup",
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
];
