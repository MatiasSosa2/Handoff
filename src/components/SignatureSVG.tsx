import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SignatureSVG = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      // Set up the starting positions
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 80%',
          once: true,
        },
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center py-12">
      <svg 
        width="280" 
        height="120" 
        viewBox="0 0 280 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <path
          ref={pathRef}
          d="M20 60 Q 40 30, 60 50 T 100 60 Q 120 70, 140 50 L 160 70 Q 180 50, 200 60 L 220 50 Q 240 60, 260 50"
          stroke="#C2A37E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 80 80 L 90 90 M 140 75 Q 150 85, 160 75"
          stroke="#C2A37E"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          style={{ strokeDasharray: '100', strokeDashoffset: '100' }}
        />
      </svg>
    </div>
  );
};

export default SignatureSVG;
