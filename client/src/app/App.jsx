import ErrorBoundary from './ErrorBoundary.jsx';
import { routes } from "./routes.jsx";
import { useRoutes, useLocation } from "react-router-dom";
import '../styles/App.css';
import Navbar from '../components/ui/navbar/Navbar.jsx';
import Footer from '../components/ui/footer/Footer.jsx';
import {motion} from 'framer-motion';


export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();
  const hideHeaderFooterPaths = ["/signup/companySignup", "/signin/companySignin","/signup/companySignup/plan_selection","/masterLogin","/maintaince"];

  const showHeaderFooter = !hideHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      <ErrorBoundary>

        {showHeaderFooter && (
          <header>
            <Navbar></Navbar>
          </header>
        )}

        <main className='min-h-screen w-full'>
          {element}
        </main>

        {showHeaderFooter && (
          <footer className=''>
           <Footer></Footer>
          </footer>
        )}

      </ErrorBoundary>
    </>
  );
}
