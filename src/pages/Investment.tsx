import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Shield, Home, MapPin, DollarSign } from 'lucide-react';
import SignatureSVG from '../components/SignatureSVG';
import InvestmentAnalytics from '../components/InvestmentAnalytics';
import AssetScanner from '../components/AssetScanner';
import RiskProfileSelector from '../components/RiskProfileSelector';

gsap.registerPlugin(ScrollTrigger);

const Investment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);

  // Sparkles effect
  const generateSparkles = () => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
  };

  const sparkles = generateSparkles();

  // Handle scroll for velocity text
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const zones = [
    { name: 'Puerto Madero', roi: '+28%', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80' },
    { name: 'Palermo Chico', roi: '+22%', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
    { name: 'Recoleta', roi: '+19%', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
    { name: 'Nordelta', roi: '+25%', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
  ];

  useGSAP(() => {
    // Hero text animation
    gsap.fromTo('.hero-word',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      }
    );

    // Zone cards animation
    gsap.fromTo('.zone-card',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.zones-section',
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="bg-charcoal min-h-screen">
      {/* Floating Navigation */}
      <nav className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {[
          { id: 'hero', label: 'Inicio' },
          { id: 'rendimiento', label: 'Rendimiento' },
          { id: 'zonas', label: 'Zonas' },
          { id: 'contacto', label: 'Contacto' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const element = document.getElementById(item.id);
              element?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(item.id);
            }}
            className={`group relative px-4 py-2 text-xs font-medium tracking-wider transition-all duration-300 ${
              activeSection === item.id
                ? 'text-gold bg-gold/10 border-l-2 border-gold'
                : 'text-parchment/50 hover:text-parchment hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Hero Section with Sparkles Background */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/edificio-5496723.jpg"
            alt="Edificio de inversión"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>

        {/* Sparkles Effect */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-gold rounded-full animate-pulse"
              style={{
                top: `${sparkle.top}%`,
                left: `${sparkle.left}%`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 z-10" style={{
          backgroundImage: `linear-gradient(#F5F2ED 1px, transparent 1px), linear-gradient(90deg, #F5F2ED 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-display-huge font-black text-white mb-8 tracking-tighter leading-none">
            <span className="hero-word block">No Vendemos</span>
            <span className="hero-word block text-gold">Propiedades.</span>
            <span className="hero-word block">Gestionamos</span>
            <span className="hero-word block text-gold">Patrimonio.</span>
          </h1>

          <p className="text-2xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Construimos legados inmobiliarios con arquitectura que trasciende generaciones
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <button
              onClick={() => document.getElementById('zonas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-charcoal font-bold tracking-wider hover:bg-gold hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 shadow-xl border-2 border-white"
            >
              EXPLORAR ZONAS
            </button>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white text-white font-bold tracking-wider hover:bg-white hover:text-charcoal hover:shadow-2xl hover:shadow-white/50 transition-all duration-300 shadow-xl backdrop-blur-sm bg-white/10"
            >
              AGENDAR CONSULTA
            </button>
          </div>
        </div>
      </section>

      {/* Sección de slogans eliminada por solicitud */}

      {/* Rendimiento Section */}
      <section id="rendimiento" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-display-fluid font-bold text-parchment mb-6">
              Rendimiento Comprobado
            </h2>
            <p className="text-xl text-parchment/70 max-w-2xl mx-auto font-light">
              Datos reales de valorización en el mercado inmobiliario premium de Buenos Aires
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { value: '+23%', label: 'ROI Promedio Anual', icon: TrendingUp },
              { value: 'USD 180M', label: 'Activos Bajo Gestión', icon: DollarSign },
              { value: '47', label: 'Transacciones Exitosas', icon: Home },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-6 bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 mb-6">
                  <stat.icon size={48} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="text-6xl font-black text-parchment mb-3">{stat.value}</div>
                <div className="text-xl text-parchment/60 font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas Section */}
      <section id="zonas" className="zones-section py-32 px-6 lg:px-8 bg-charcoal/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-display-fluid font-bold text-parchment mb-6">
              Zonas de Alta Rentabilidad
            </h2>
            <p className="text-xl text-parchment/70 max-w-2xl mx-auto font-light">
              Selección estratégica de ubicaciones con máximo potencial de valorización
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {zones.map((zone, index) => (
              <div key={index} className="zone-card group relative overflow-hidden h-[400px] cursor-pointer">
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-gold text-sm mb-2">
                    <MapPin size={16} />
                    <span className="text-white">{zone.name}</span>
                  </div>
                  <div className="text-4xl font-black text-white">{zone.roi}</div>
                  <div className="text-sm text-white/80 mt-1">Valorización Anual</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Ultra Modern Design */}
      <section id="contacto" className="relative py-40 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-charcoal via-charcoal to-olive/20">
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #C2A37E 1px, transparent 1px), linear-gradient(to bottom, #C2A37E 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            animation: 'gridPulse 20s ease-in-out infinite'
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-olive/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div className="text-center mb-8">
            <span className="inline-block px-6 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs tracking-[0.3em] uppercase font-bold backdrop-blur-sm">
              Consultoría Exclusiva
            </span>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-light text-parchment mb-6 leading-tight tracking-tight">
              ¿Listo para Invertir en Su{' '}
              <span className="relative inline-block">
                <span className="font-bold italic text-gold drop-shadow-lg">
                  Legado
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="#C2A37E" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
              </span>
              ?
            </h2>
            <p className="text-xl md:text-2xl text-parchment/70 font-light max-w-3xl mx-auto leading-relaxed">
              Agende una consulta privada con nuestro equipo de{' '}
              <span className="text-gold font-medium">asesores senior</span>
            </p>
          </div>
          
          {/* Firma manuscrita eliminada por solicitud */}
          
          {/* CTA Button with Advanced Styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contacto"
              className="group relative px-12 py-6 bg-gradient-to-r from-gold via-gold to-parchment text-charcoal text-base font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(194,163,126,0.6)] rounded-sm"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <span className="relative z-10 flex items-center gap-3">
                INICIAR CONSULTA PRIVADA
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            
            {/* Secondary Link */}
            <a
              href="#" 
              className="px-8 py-4 border-2 border-gold/40 text-gold text-sm font-semibold tracking-wider uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 rounded-sm backdrop-blur-sm"
            >
              Ver Casos de Éxito
            </a>
          </div>

          {/* Indicadores de confianza eliminados por solicitud */}
        </div>
      </section>

      {/* New: Asset Scanner */}
      <AssetScanner />

      {/* New: Risk Profile Selector */}
      <RiskProfileSelector />

      {/* New: Investment Analytics Terminal */}
      <InvestmentAnalytics />
    </div>
  );
};

export default Investment;
