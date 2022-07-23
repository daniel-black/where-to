import { useState, useEffect } from "react";

// const windowSize = useWindowSize();   // returns [width, height]
const useWindowSize = () => {
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    const handleResize = () => setSize({width: window.innerWidth, height: window.innerHeight});

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;

// Tailwindcss breakpoints:
// 'sm' when width >= 640px
// 'md' when width >= 768px
// 'lg' when width >= 1024px
// 'xl' when width >= 1280px
// '2xl' when width >= 1536px

// Can define a boolean like:
// const isMobile = windowSize[0] < 640;