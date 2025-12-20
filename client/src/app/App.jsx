
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
        <h1>ProveIt header</h1>
      </header>
      {element}
      <footer>
          <h1>ProveIt footer</h1>
      </footer>
    </ErrorBoundary>
    {/* </ThemeProvider> */}
    </>
  )
}


