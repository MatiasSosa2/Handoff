import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, MapPin, Home, Maximize2, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// 1. HERO - Minimalista y Elegante
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const container = useRef<HTMLElement>(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      title: 'Inversiones',
      subtitle: 'que trascienden el tiempo',
      cta: 'Explorar Portfolio',
      position: 'left'
    },
    {
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80',
      title: 'Arquitectura',
      subtitle: 'como expresión de permanencia',
      cta: 'Ver Propiedades',
      position: 'center'
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
      title: 'Espacios',
      subtitle: 'que definen una vida',
      cta: 'Solicitar Tour',
      position: 'right'
    },
  ];

  useGSAP(() => {
    // Animación tipo fade in muy sutil
    gsap.fromTo(".hero-content", 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5,
        ease: "power2.out"
      }
    );
  }, { scope: container, dependencies: [currentSlide] });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-neutral-900">
      {/* Background Image con overlay para contraste */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={s.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            {/* Overlay oscuro sutil para garantizar legibilidad */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Navigation Dots - Minimalista */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Content - Alineado según slide */}
      <div className={`relative h-full flex items-center px-8 md:px-16 lg:px-24 z-20 ${
        slide.position === 'left' ? 'justify-start' : 
        slide.position === 'center' ? 'justify-center' : 
        'justify-end'
      }`}>
        <div className="hero-content max-w-xl text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {/* Subtítulo pequeño arriba */}
          <div className="mb-6">
            <span className="text-xs tracking-[0.3em] font-medium uppercase opacity-80">
              Legacy Real Estate
            </span>
          </div>
          
          {/* Título principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
            {slide.title}
            <span className="block text-2xl md:text-3xl font-light mt-4 opacity-95">
              {slide.subtitle}
            </span>
          </h1>
          
          {/* CTA Simple */}
          <Link
            to="/properties"
            className="group inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
          >
            <span>{slide.cta}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - Muy discreto */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="text-xs tracking-widest text-white/50 uppercase animate-pulse">
          Scroll
        </div>
      </div>
    </section>
  );
};

// 2. MARKET TICKER - Delgado y elegante
const MarketTicker = () => {
  const marketData = [
    { zone: 'Puerto Madero', value: '+2.4%' },
    { zone: 'Recoleta', value: 'USD 4,800/m²' },
    { zone: 'ROI Promedio', value: '12.5%' },
    { zone: 'Palermo Chico', value: 'USD 5,200/m²' },
    { zone: 'Valorización', value: '+23%' },
    { zone: 'Nordelta', value: 'USD 3,100/m²' },
  ];

  return (
    <div className="w-full bg-neutral-900 border-y border-white/10 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex gap-12 items-center px-8">
            {marketData.map((item, i) => (
              <div key={`${groupIndex}-${i}`} className="flex items-center gap-4">
                <span className="text-xs tracking-[0.2em] text-white/70 uppercase">
                  {item.zone}
                </span>
                <span className="text-sm font-medium text-white">
                  {item.value}
                </span>
                <div className="w-px h-4 bg-white/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// 3. SERVICES - Grid minimalista
const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'Brokerage Exclusivo',
      description: 'Transacciones de alta gama con enfoque en discreción y valor',
      number: '01'
    },
    {
      title: 'Gestión Patrimonial',
      description: 'Optimización de portafolios con estrategias a largo plazo',
      number: '02'
    },
    {
      title: 'Asesoría Integral',
      description: 'Desde búsqueda hasta post-venta, un acompañamiento completo',
      number: '03'
    },
  ];

  useGSAP(() => {
    gsap.fromTo('.service-item',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={servicesRef} className="py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Pattern decorativo sutil en el fondo */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-charcoal/60 uppercase mb-4 block">
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            Enfoque <span className="italic">integral</span>
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
            Cada aspecto de su inversión inmobiliaria, cuidado al detalle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item group relative"
            >
              {/* Card con borde sutil y efecto hover elegante */}
              <div className="relative p-8 border border-charcoal/10 bg-white/80 backdrop-blur-sm transition-all duration-500 group-hover:border-charcoal/30 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:bg-white">
                
                {/* Número pequeño arriba con círculo decorativo */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-charcoal/20 flex items-center justify-center group-hover:border-charcoal/40 group-hover:bg-charcoal/5 transition-all duration-300">
                    <span className="text-xs font-bold text-charcoal/60">
                      {service.number}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-charcoal/20 to-transparent" />
                </div>
                
                {/* Título */}
                <h3 className="text-xl font-medium text-charcoal mb-4 tracking-tight group-hover:text-gray-900 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-charcoal/70 leading-relaxed text-[15px] mb-6">
                  {service.description}
                </p>
                
                {/* Línea inferior con animación de expansión */}
                <div className="relative h-px w-full bg-charcoal/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
                
                {/* Corner accent decorativo */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. FEATURED PROPERTIES - Grid limpio
const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: 'PH Único en Recoleta',
      location: 'Recoleta, Buenos Aires',
      price: 'USD 2,500,000',
      specs: { bedrooms: 4, bathrooms: 5, area: 420 },
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80'
    },
    {
      id: 2,
      title: 'Penthouse Vista 360°',
      location: 'Puerto Madero',
      price: 'USD 3,800,000',
      specs: { bedrooms: 3, bathrooms: 4, area: 380 },
      image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80'
    },
    {
      id: 3,
      title: 'Casa de Diseño',
      location: 'Palermo Chico',
      price: 'USD 2,900,000',
      specs: { bedrooms: 5, bathrooms: 5, area: 450 },
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'
    },
  ];

  return (
    <section className="py-32 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-white/70 uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Propiedades <span className="italic">curadas</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Selección de activos premium disponibles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="text-xl font-medium text-white">
                  {property.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <div className="flex items-center gap-1">
                      <Home size={14} />
                      <span>{property.specs.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 size={14} />
                      <span>{property.specs.area}m²</span>
                    </div>
                  </div>
                  
                  <div className="text-lg font-medium text-white">
                    {property.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            to="/properties"
            className="inline-flex items-center gap-3 text-sm font-medium tracking-widest text-white/80 hover:text-white transition-colors duration-300"
          >
            <span>Ver todas las propiedades</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// 5. INSIGHTS - Datos limpios
const Insights = () => {
  const insights = [
    { value: '+23%', label: 'Valorización anual', icon: TrendingUp },
    { value: '98%', label: 'Satisfacción clientes', icon: Star },
    { value: '15+', label: 'Años de experiencia', icon: TrendingUp },
    { value: '200+', label: 'Inversores activos', icon: Star },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-charcoal/60 uppercase mb-4 block">
            Impacto
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            Datos que <span className="italic">respaldan</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {insights.map((insight, index) => {
            return (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-medium text-charcoal mb-2">
                  {insight.value}
                </div>
                <p className="text-sm text-charcoal/60">
                  {insight.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 pt-20 border-t border-charcoal/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-charcoal/60 mb-8">
              "No vendemos propiedades, construimos legados inmobiliarios que perduran"
            </p>
            <span className="text-xs tracking-[0.3em] text-charcoal/50 uppercase">
              Filosofía Handoff
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. TESTIMONIALS - Carruseles duales
const TestimonialsSection = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const testimonials = [
    { quote: "Encontramos nuestra propiedad soñada gracias a HANDOFF. Proceso impecable.", author: "María González", avatar: "https://i.pravatar.cc/150?img=1" },
    { quote: "El mejor servicio inmobiliario que he experimentado. Totalmente profesional.", author: "Carlos Martínez", avatar: "https://i.pravatar.cc/150?img=2" },
    { quote: "Inversión segura y rentable. Los recomiendo sin dudarlo.", author: "Laura Fernández", avatar: "https://i.pravatar.cc/150?img=3" },
    { quote: "Atención personalizada de primer nivel. Superaron todas mis expectativas.", author: "Roberto Silva", avatar: "https://i.pravatar.cc/150?img=4" },
    { quote: "Transparencia absoluta en cada paso del proceso. Excelente equipo.", author: "Ana Patricia López", avatar: "https://i.pravatar.cc/150?img=5" },
    { quote: "Propiedades exclusivas que no encontrarás en otro lado. Vale la pena.", author: "Diego Ramírez", avatar: "https://i.pravatar.cc/150?img=6" },
    { quote: "Mi familia está encantada con nuestra nueva casa. Gracias HANDOFF.", author: "Sofía Méndez", avatar: "https://i.pravatar.cc/150?img=7" },
    { quote: "ROI excepcional en menos de 2 años. Inversión muy bien asesorada.", author: "Javier Torres", avatar: "https://i.pravatar.cc/150?img=8" },
    { quote: "El proceso legal fue manejado de forma impecable. Sin sorpresas.", author: "Valentina Ruiz", avatar: "https://i.pravatar.cc/150?img=9" },
    { quote: "Acceso a propiedades off-market que cambiaron mi portfolio.", author: "Martín Sánchez", avatar: "https://i.pravatar.cc/150?img=10" },
    { quote: "Servicio white glove real. Atención a cada detalle.", author: "Carolina Díaz", avatar: "https://i.pravatar.cc/150?img=11" },
    { quote: "La mejor decisión de inversión que tomé este año.", author: "Fernando Castro", avatar: "https://i.pravatar.cc/150?img=12" },
    { quote: "Profesionalismo y discreción en todo momento. Impresionante.", author: "Isabel Morales", avatar: "https://i.pravatar.cc/150?img=13" },
    { quote: "Asesoramiento de primer nivel. Conocen el mercado perfectamente.", author: "Andrés Vargas", avatar: "https://i.pravatar.cc/150?img=14" },
    { quote: "Proceso rápido y eficiente. Sin complicaciones.", author: "Camila Rojas", avatar: "https://i.pravatar.cc/150?img=15" },
    { quote: "Encontré exactamente lo que buscaba. Recomendados al 100%.", author: "Ricardo Herrera", avatar: "https://i.pravatar.cc/150?img=16" },
  ];

  useGSAP(() => {
    // Infinite carousel - Row 1 (Left to Right)
    if (row1Ref.current) {
      gsap.to(row1Ref.current, {
        x: '-50%',
        duration: 60,
        ease: 'none',
        repeat: -1,
      });
    }

    // Infinite carousel - Row 2 (Right to Left)
    if (row2Ref.current) {
      gsap.fromTo(row2Ref.current,
        { x: '-50%' },
        {
          x: '0%',
          duration: 60,
          ease: 'none',
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <section className="py-32 bg-neutral-900 overflow-hidden">
      <div className="mb-16 text-center px-6">
        <span className="text-xs tracking-[0.3em] text-white/70 uppercase mb-4 block">
          Testimonios
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Confianza <span className="italic">compartida</span>
        </h2>
      </div>

      {/* Row 1 - Moving Right */}
      <div className="mb-6 overflow-hidden">
        <div ref={row1Ref} className="flex gap-4" style={{ width: '200%' }}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/15 hover:border-white/20 transition-all duration-300"
              style={{ width: '340px', minHeight: '180px' }}
            >
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
                <div className="bg-white/10 px-3 py-1.5 rounded-full">
                  <p className="text-xs font-medium text-white">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moving Left */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex gap-4" style={{ width: '200%' }}>
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/15 hover:border-white/20 transition-all duration-300"
              style={{ width: '340px', minHeight: '180px' }}
            >
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
                <div className="bg-white/10 px-3 py-1.5 rounded-full">
                  <p className="text-xs font-medium text-white">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16 px-6">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
        >
          <span>Iniciar conversación</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
};

// 7. FINAL CTA - Minimalista
const FinalCTA = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <span className="text-xs tracking-[0.3em] text-charcoal/60 uppercase mb-4 block">
          Próximo Paso
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">
          Su legado inmobiliario <span className="italic">comienza aquí</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            to="/properties"
            className="px-8 py-4 bg-neutral-900 text-white text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
          >
            Explorar propiedades
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-neutral-900 text-neutral-900 text-sm font-medium tracking-widest uppercase hover:bg-neutral-900/5 transition-colors duration-300"
          >
            Contactar asesor
          </Link>
        </div>
      </div>
    </section>
  );
};

// 8. HOME COMPONENT PRINCIPAL
const HomeComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth scroll animation
    gsap.utils.toArray('section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen">
      <Hero />
      <MarketTicker />
      <Services />
      <FeaturedProperties />
      <Insights />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
};

export default HomeComponent;
