import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award, Users, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MarketInsight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const insights = [
    {
      icon: TrendingUp,
      value: '+23%',
      label: 'Valorización Anual',
      description: 'En zonas premium de Buenos Aires',
    },
    {
      icon: Building2,
      value: '47',
      label: 'Propiedades Curadas',
      description: 'Selección exclusiva mensual',
    },
    {
      icon: Award,
      value: '15+',
      label: 'Años de Experiencia',
      description: 'En inversión inmobiliaria de lujo',
    },
    {
      icon: Users,
      value: '200+',
      label: 'Inversores Activos',
      description: 'Cartera global de clientes',
    },
  ];

  useGSAP(() => {
    // Animate line expanding
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // Animate cards
    gsap.fromTo('.insight-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          once: true,
        },
      }
    );

    // Parallax effect on background
    gsap.to('.parallax-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-olive">
      {/* Parallax Background Pattern */}
      <div className="parallax-bg absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)`,
          color: '#F5F2ED'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Decorative Line */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-24 h-px bg-gold/40" />
          <div ref={lineRef} className="mx-4 h-px bg-gold origin-center" style={{ width: '200px' }} />
          <div className="w-24 h-px bg-gold/40" />
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-display-md font-bold text-parchment mb-4">
            El Mercado en Perspectiva
          </h2>
          <p className="text-lg text-parchment/80 max-w-2xl mx-auto font-light">
            Datos que respaldan nuestra experiencia en inversión inmobiliaria de alto valor
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="insight-card group relative p-8 bg-parchment/5 backdrop-blur-sm border border-parchment/10 hover:bg-parchment/10 transition-all duration-500"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex p-4 bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500">
                  <insight.icon size={32} className="text-gold" strokeWidth={1.5} />
                </div>
              </div>

              {/* Value */}
              <div className="text-5xl font-black text-parchment mb-2 tracking-tight">
                {insight.value}
              </div>

              {/* Label */}
              <div className="text-xl font-semibold text-gold mb-2">
                {insight.label}
              </div>

              {/* Description */}
              <p className="text-sm text-parchment/70 font-light leading-relaxed">
                {insight.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-20 text-center">
          <blockquote className="text-2xl font-light italic text-parchment/90 max-w-3xl mx-auto">
            "La arquitectura de lujo no es solo un espacio, es una declaración de permanencia"
          </blockquote>
          <cite className="block mt-4 text-sm text-gold tracking-widest uppercase">
            — Filosofía Handoff
          </cite>
        </div>
      </div>
    </section>
  );
};

export default MarketInsight;
