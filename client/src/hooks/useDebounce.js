// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * Returns a debounced value that only updates
 * after `delay` ms have passed without changes.
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
