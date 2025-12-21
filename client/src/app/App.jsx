
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes } from "react-router-dom";
import '../styles/App.css'
import Footer from '../components/ui/footer/Footer.jsx'
import Navbar from '../components/ui/navbar/Navbar.jsx';

export default function App() {
  const element = useRoutes(routes);
  return (
    <>
    {/* <ThemeProvider> */}
     <ErrorBoundary>

      <header className=''>
        <Navbar></Navbar>
      </header>

      <main className='pt-24 md:pt-28 min-h-screen'>
      {element}
      </main>
      
      
      <footer className='mt-24 border-t-1 border-gray-300 bg-white  transition-all duration-200 dark:border-amber-50/10'>
          <Footer></Footer>
      </footer>

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


