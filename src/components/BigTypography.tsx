import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BigTypographyProps {
  text: string;
  color?: 'olive' | 'gold' | 'charcoal';
}

const BigTypography = ({ text, color = 'olive' }: BigTypographyProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  const colorClasses = {
    olive: 'text-olive/[0.03]',
    gold: 'text-gold/[0.04]',
    charcoal: 'text-charcoal/[0.02]',
  };

  useGSAP(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden py-32">
      <div 
        ref={textRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black ${colorClasses[color]} select-none leading-none whitespace-nowrap pointer-events-none`}
      >
        {text}
      </div>
    </div>
  );
};

export default BigTypography;
