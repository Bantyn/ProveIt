
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes } from "react-router-dom";
import '../styles/App.css'

export default function App() {
  const element = useRoutes(routes);
  return (
    <>
    {/* <ThemeProvider> */}
     <ErrorBoundary>

      <header>
        <h1 class="dark:text-white text-center py-5 bg-black border-b-1 dark:border-amber-50/10 fixed z-50 w-full top-0">ProveIt header</h1>
      </header>

      <main className='md:mt-15 mt-30'>
      {element}
      </main>
      
      
      <footer className='mt-50'>
          <h1 class="dark:text-white text-center py-5 bg-black border-t-1 dark:border-amber-50/10 h-50 pt-10">ProveIt footer</h1>
      </footer>

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


