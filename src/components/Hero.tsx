import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const container = useRef();

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      title: 'Inversiones inmobiliarias',
      subtitle: 'que trascienden generaciones',
      isDark: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
      title: 'Residencias exclusivas',
      subtitle: 'en las zonas más codiciadas de Buenos Aires',
      isDark: true,
    },
  ];

  // Animación que reacciona al cambio de slide
  useGSAP(() => {
    gsap.fromTo(".hero-content > *", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
    );
  }, { scope: container, dependencies: [currentSlide] });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Background Images con Crossfade suave */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover scale-105 animate-slow-zoom" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative h-full flex items-center justify-center px-6 text-center">
        <div className="hero-content max-w-4xl">
          <h1 className="hero-title text-5xl md:text-7xl font-serif text-white mb-4 tracking-tight">
            {slide.title}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-white/90 mb-10 font-light">
            {slide.subtitle}
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/properties"
              className={`px-10 py-4 font-bold tracking-widest transition-all duration-300 animate-pulse-subtle ${
                slide.isDark 
                ? 'bg-white text-charcoal hover:bg-gold hover:text-white' 
                : 'bg-charcoal text-white hover:bg-gold'
              }`}
            >
              VER PROPIEDADES
            </Link>
            <Link
              to="/investment"
              className="px-10 py-4 border border-white/50 text-white hover:bg-white/10 transition-all"
            >
              Inversiones
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation - Simplificada */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10 pointer-events-none">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} 
                className="pointer-events-auto p-2 text-white/50 hover:text-gold transition-colors">
          <ChevronLeft size={40} strokeWidth={1} />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} 
                className="pointer-events-auto p-2 text-white/50 hover:text-gold transition-colors">
          <ChevronRight size={40} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
