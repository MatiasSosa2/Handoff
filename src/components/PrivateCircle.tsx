import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Wine, Palette, Shield, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PrivateCircle = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const partners = [
    {
      icon: Plane,
      title: 'Aviación Privada',
      brand: 'Executive Jets',
      benefit: 'Tarifas preferenciales en vuelos charter',
      spotlight: true,
    },
    {
      icon: Wine,
      title: 'Catas Exclusivas',
      brand: 'Bodega Catena Zapata',
      benefit: 'Acceso a colecciones limitadas',
      spotlight: false,
    },
    {
      icon: Palette,
      title: 'Diseño Interior',
      brand: 'Estudio Humphrey',
      benefit: 'Consultoría gratuita inicial',
      spotlight: true,
    },
    {
      icon: Shield,
      title: 'Seguridad Premium',
      brand: 'Global Security',
      benefit: 'Sistemas de última generación',
      spotlight: false,
    },
    {
      icon: Calendar,
      title: 'Eventos VIP',
      brand: 'HANDOFF Circle',
      benefit: 'Networking inmobiliario exclusivo',
      spotlight: true,
    },
    {
      icon: Sparkles,
      title: 'Concierge Digital',
      brand: '24/7 Assistance',
      benefit: 'Gestión integral de servicios',
      spotlight: false,
    },
  ];

  useGSAP(() => {
    // Bento grid animation
    gsap.from('.partner-card', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        from: 'start',
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.partners-grid',
        start: 'top 75%',
        once: true,
      },
    });

    // Spotlight effect setup
    const cards = gsap.utils.toArray<HTMLElement>('.partner-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-parchment relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">
            The Private Circle
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-charcoal mb-4 tracking-tight">
            Red de <span className="font-bold text-olive italic">Privilegios Exclusivos</span>
          </h2>
          <p className="text-taupe text-lg font-light max-w-2xl mx-auto">
            Pertenecer a HANDOFF significa acceso a una red curada de servicios premium y experiencias excepcionales.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="partners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className={`partner-card relative bg-white border border-olive/10 p-8 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-gold/30 ${
                  partner.spotlight ? 'lg:col-span-1' : ''
                }`}
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Spotlight Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(194,163,126,0.15), transparent)',
                  }}
                />

                {/* Golden Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[-1px] bg-gradient-to-r from-gold via-gold to-transparent opacity-30" style={{ clipPath: 'inset(0 0 99% 0)' }} />
                  <div className="absolute inset-[-1px] bg-gradient-to-b from-gold via-gold to-transparent opacity-30" style={{ clipPath: 'inset(0 99% 0 0)' }} />
                  <div className="absolute inset-[-1px] bg-gradient-to-r from-transparent via-gold to-gold opacity-30" style={{ clipPath: 'inset(99% 0 0 0)' }} />
                  <div className="absolute inset-[-1px] bg-gradient-to-b from-transparent via-gold to-gold opacity-30" style={{ clipPath: 'inset(0 0 0 99%)' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={24} className="text-gold" />
                  </div>

                  {/* Title & Brand */}
                  <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-olive transition-colors">
                    {partner.title}
                  </h3>
                  <p className="text-sm text-gold font-semibold tracking-wide mb-4 uppercase">
                    {partner.brand}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-[1px] bg-olive/20 mb-4 group-hover:w-full group-hover:bg-gold/40 transition-all duration-500" />

                  {/* Benefit */}
                  <p className="text-taupe text-sm font-light leading-relaxed">
                    {partner.benefit}
                  </p>

                  {/* Badge */}
                  <div className="mt-6">
                    <span className="inline-block px-3 py-1 bg-olive/5 text-olive text-xs font-mono tracking-wider uppercase border border-olive/10">
                      Exclusivo Clientes
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Digital Concierge */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-charcoal p-12 relative overflow-hidden group cursor-pointer">
            {/* Animated Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-[-2px] bg-gradient-to-r from-gold via-gold/50 to-gold animate-pulse" />
              <div className="absolute inset-0 bg-charcoal" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={32} className="text-gold" />
              </div>
              <h3 className="text-3xl font-light text-parchment mb-3">
                Concierge Digital <span className="font-bold text-gold">24/7</span>
              </h3>
              <p className="text-taupe mb-8 max-w-md mx-auto">
                Asistencia integral para gestión de servicios, mantenimiento y lifestyle management.
              </p>
              <button className="px-10 py-4 bg-gold text-charcoal font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,163,126,0.6)] hover:scale-105">
                Activar Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateCircle;
