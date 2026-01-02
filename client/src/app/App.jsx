import ErrorBoundary from './ErrorBoundary.jsx';
import { routes } from "./routes.jsx";
<<<<<<< HEAD
// import { ThemeProvider } from "next-themes";
import { useRoutes,useLocation } from "react-router-dom";
import '../styles/App.css'
import Footer from '../components/ui/footer/Footer.jsx'
=======
import { useRoutes, useLocation } from "react-router-dom";
import '../styles/App.css';
>>>>>>> 5eead8797d3c3d793b36e512844095c78c7d6ed4
import Navbar from '../components/ui/navbar/Navbar.jsx';
import Footer from '../components/ui/footer/Footer.jsx';
import {motion} from 'framer-motion';


export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();
<<<<<<< HEAD
  const hideHeaderFooterPaths = ["/signup/companySignup", "/signin/companySignin","/signup/companySignup/plan_selection","/masterLogin","/signup/clientSignup"];

  const showHeaderFooter = !hideHeaderFooterPaths.includes(location.pathname);
  return (
    <>
    {/* <ThemeProvider> */}
     <ErrorBoundary>
      {showHeaderFooter && (
      <header className=''>
        <Navbar></Navbar>
      </header>)}

      <main className='min-h-screen'>
      {element}
      </main>
      
      {showHeaderFooter && (
      <footer className='mt-24 border-t-1 border-gray-500/20  transition-all duration-200 dark:border-amber-50/10'>
          <Footer></Footer>
      </footer>)}
=======
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
>>>>>>> 5eead8797d3c3d793b36e512844095c78c7d6ed4

        {showHeaderFooter && (
          <footer className=''>
           <Footer></Footer>
          </footer>
        )}

      </ErrorBoundary>
    </>
  );
}
