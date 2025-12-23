
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";
// import { ThemeProvider } from "next-themes";
import { useRoutes } from "react-router-dom";
import '../styles/App.css'
<<<<<<< HEAD
import Footer from '../components/ui/footer/Footer.jsx'
import Navbar from '../components/ui/navbar/Navbar.jsx';
=======
import Navbar from '../features/components/Navbar.jsx'
import Footer from '../features/components/Footer.jsx'
>>>>>>> bf292ce14d9fcff35b80b3af4f3421dea5cd1366

export default function App() {
  const element = useRoutes(routes);
  return (
    <>
    {/* <ThemeProvider> */}
     <ErrorBoundary>
<<<<<<< HEAD

      <header className=''>
        <Navbar></Navbar>
      </header>

      <main className='pt-24 md:pt-28 min-h-screen'>
=======
      <Navbar />
      <main className='md:mt-15 mt-30'>
>>>>>>> bf292ce14d9fcff35b80b3af4f3421dea5cd1366
      {element}
      </main>
      
      
<<<<<<< HEAD
      <footer className='mt-24 border-t-1 border-gray-500/20  transition-all duration-200 dark:border-amber-50/10'>
          <Footer></Footer>
      </footer>
=======
    
      <Footer />

>>>>>>> bf292ce14d9fcff35b80b3af4f3421dea5cd1366

    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


