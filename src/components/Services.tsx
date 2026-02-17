import { useRef } from 'react';
import { Building2, TrendingUp, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Building2,
      title: 'Brokerage de Élite',
      description: 'Gestión exclusiva de propiedades premium en las ubicaciones más codiciadas de Buenos Aires.',
    },
    {
      icon: TrendingUp,
      title: 'Asset Management',
      description: 'Análisis de rentabilidad y gestión integral de patrimonio inmobiliario de alto valor.',
    },
    {
      icon: Sparkles,
      title: 'Lifestyle Concierge',
      description: 'Interiorismo, reformas y servicios personalizados para elevar su experiencia residencial.',
    },
  ];

  useGSAP(() => {
    gsap.fromTo('.service-card', 
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
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
    <section id="services" ref={servicesRef} className="py-32 bg-parchment">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-display-md font-bold text-olive mb-4">
            Servicios de Guante Blanco
          </h2>
          <p className="text-lg text-taupe max-w-2xl mx-auto font-light">
            No solo vendemos propiedades, gestionamos legados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative p-8 bg-white hover:bg-olive transition-all duration-500 cursor-pointer"
              >
                <div className="mb-6">
                  <Icon
                    size={40}
                    strokeWidth={1.5}
                    className="text-olive group-hover:text-gold transition-colors duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-charcoal group-hover:text-parchment transition-colors duration-500 mb-4">
                  {service.title}
                </h3>
                <p className="text-taupe group-hover:text-parchment/80 transition-colors duration-500 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
