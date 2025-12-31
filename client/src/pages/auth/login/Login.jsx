import React from 'react'
import Loader from '../../../components/ui/loader/ScreenLoader'
export default function Login() {
  
   const [loading, setLoading] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 800); // when fade starts

    // Remove loader after animation
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1200); // must be fade duration + buffer

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);
  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className={`transition-opacity duration-500 ease-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Loader maxHeight={150} />
        </div>
      )}

      {!loading && (
        <div className="animate-fadeIn">
          {/* Your Login Page Content */}
        </div>
      )}
    </div>
  )
}
