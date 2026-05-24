import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
