
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes } from "react-router-dom";
import '../styles/App.css'
import Navbar from '../features/components/Navbar.jsx'
import Footer from '../features/components/Footer.jsx'

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
      
      
    
      <Footer />


    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


