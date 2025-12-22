
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes } from "react-router-dom";
import '../styles/App.css'
import Navbar from '../features/components/navbar.jsx'

export default function App() {
  const element = useRoutes(routes);
  return (
    <>
    {/* <ThemeProvider> */}
     <ErrorBoundary>
      <Navbar />
      <main className='md:mt-15 mt-30'>
      {element}
      </main>
      
      
      <footer className='mt-50'>
          <h1 className="dark:text-white text-center py-5 bg-white dark:bg-black border-t-1 dark:border-amber-50/10 border-blac/10 h-50 pt-10">ProveIt footer</h1>
      </footer>

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


