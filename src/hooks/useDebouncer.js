import { useState, useEffect } from "react";
export default function useDebouncer(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounced;
}
