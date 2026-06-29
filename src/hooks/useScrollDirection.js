import { useState, useEffect, useRef } from 'react';

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState('up');
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      if (Math.abs(diff) < threshold) return;

      setDirection(diff > 0 ? 'down' : 'up');
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return direction;
}
