
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes,useLocation } from "react-router-dom";
import '../styles/App.css'
import Footer from '../components/ui/footer/Footer.jsx'
import Navbar from '../components/ui/navbar/Navbar.jsx';

export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();
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

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


