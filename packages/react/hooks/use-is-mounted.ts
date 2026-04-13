import { useState, useEffect } from "react";

/**
 * useIsMounted
 * Useful for Next.js SSR and Framer Motion components that depend on 
 * window, document, or Math.random() on initial load to avoid Hydration Mismatch errors.
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
