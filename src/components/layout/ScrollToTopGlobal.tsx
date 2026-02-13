import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopGlobal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant jump to top
    // window.scrollTo(0, 0);
    
    // OR use 'smooth' if you want a gliding effect:
    window.scrollTo({ top: 0, left: 0, behavior:'smooth' });
  }, [pathname]);

  return null;
}