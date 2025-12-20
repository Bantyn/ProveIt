
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

      <header>
        <Navbar></Navbar>
      </header>

      <main className='pt-24 md:pt-28'>
      {element}
      </main>
      
      
      <footer className='mt-24'>
          <Footer></Footer>
      </footer>

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


