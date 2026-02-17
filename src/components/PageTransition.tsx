import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  }, [location]);

  return <div ref={contentRef}>{children}</div>;
};

export default PageTransition;
