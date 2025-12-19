
import ErrorBoundary from './ErrorBoundary.jsx'
import { routes } from "./routes.jsx";

import { useRoutes } from "react-router-dom";
import '../styles/App.css'

export default function App() {
  const element = useRoutes(routes);
  return (
    <>
     <ErrorBoundary>
      {element}
    </ErrorBoundary>
    </>
  )
}


