import ErrorBoundary from './ErrorBoundary.jsx';
import { routes } from "./routes.jsx";
import { useRoutes, useLocation } from "react-router-dom";
import '../styles/App.css';

export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();
  const hideHeaderFooterPaths = ["/signup/companySignup", "/signin/companySignin","/signup/companySignup/plan_selection","/masterLogin"];

  const showHeaderFooter = !hideHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      <ErrorBoundary>

        {showHeaderFooter && (
          <header>
            <h1 className="dark:text-white text-center py-5 bg-white dark:bg-black border-b border-black/10 fixed z-50 w-full top-0">
              ProveIt header
            </h1>
          </header>
        )}

<<<<<<< HEAD
        <main className=''>
          {element}
        </main>
=======
      <main className='pt-24 min-h-screen'>
      {element}
      </main>
      
      
      <footer className='mt-24 border-t-1 border-gray-500/20  transition-all duration-200 dark:border-amber-50/10'>
          <Footer></Footer>
      </footer>
>>>>>>> banty

        {showHeaderFooter && (
          <footer className='mt-50'>
            <h1 className="dark:text-white text-center py-5 bg-white dark:bg-black border-t border-black/10 h-50 pt-10">
              ProveIt footer
            </h1>
          </footer>
        )}

      </ErrorBoundary>
    </>
  );
}
