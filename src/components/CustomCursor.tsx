import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
        });
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Punto del cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-parchment rounded-full pointer-events-none z-[10001] hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
