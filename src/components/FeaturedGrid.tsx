import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { properties as allProperties } from '../data/properties';

gsap.registerPlugin(ScrollTrigger);

const FeaturedGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Show only first 5 properties on home page
  const properties = allProperties.slice(0, 5).map((prop, index) => ({
    ...prop,
    size: index === 0 || index === 3 ? 'large' : 'medium',
  }));

  useGSAP(() => {
    gsap.fromTo('.property-card',
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Parallax effect on images
    const cards = gsap.utils.toArray<HTMLElement>('.property-card');
    cards.forEach((card) => {
      const image = card.querySelector('.property-image');
      if (image) {
        gsap.to(image, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    });
  }, []);

  return (
    <section id="properties" ref={gridRef} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-display-md font-bold text-olive mb-4">
            Colección Exclusiva
          </h2>
          <p className="text-lg text-taupe max-w-2xl mx-auto font-light">
            Propiedades cuidadosamente seleccionadas en las zonas más prestigiosas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/propiedad/${property.id}`}
              className={`property-card group relative overflow-hidden cursor-pointer ${
                property.size === 'large' ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${
                property.size === 'large' ? 'aspect-[21/9] min-h-[400px]' : 'aspect-[4/3] min-h-[350px]'
              }`}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="property-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 px-4 py-1 bg-gold text-charcoal text-xs font-semibold tracking-wider">
                  {property.status}
                </div>

                {/* Content Overlay */}
                <div className="card-content absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center text-white text-sm mb-2 drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-semibold">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2 drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] tracking-tight line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center text-white text-sm drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-semibold">
                      <Home size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{property.specs.bedrooms} dorm • {property.specs.bathrooms} baños</span>
                    </div>
                    <div className="text-gold font-extrabold text-lg lg:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] whitespace-nowrap">
                      {property.price}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Off-Market CTA - Aceternity Inspired Dark Section */}
        <section className="relative flex items-center justify-center overflow-hidden rounded-sm mt-20" style={{ height: '80vh', backgroundColor: '#E5E5E5' }}>
          
          {/* Architectural Grid Lines */}
          <div 
            className="absolute inset-0 border border-charcoal/5 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, rgba(38,38,38,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(38,38,38,0.05) 1px, transparent 1px)', 
              backgroundSize: '100px 100px' 
            }} 
          />

          {/* 3. Content Container */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            
            {/* Badge */}
            <span className="text-gold uppercase mb-4 block" style={{ fontSize: '10px', letterSpacing: '0.5em', animation: 'fadeIn 1s ease-out' }}>
              Colección Privada
            </span>
            
            {/* Cinematographic Title */}
            <h2 className="font-light text-charcoal leading-none mb-8 tracking-tight" style={{ fontSize: 'clamp(60px, 10vw, 120px)' }}>
              Off{' '}
              <span 
                className="font-black not-italic" 
                style={{ 
                  background: 'linear-gradient(to bottom, #C2A37E 0%, #C2A37E 40%, rgba(194, 163, 126, 0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Market
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-xl mx-auto text-charcoal text-lg font-light mb-4 leading-relaxed">
              Activos inmobiliarios de alto valor gestionados bajo estricta confidencialidad.
            </p>
            <span className="block text-olive/80 italic text-sm mb-12">
              Acceso exclusivo para miembros registrados.
            </span>

            {/* CTA removido: Solicitar Credenciales */}
          </div>
        </section>
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .group:hover .group-hover\\:text-charcoal {
            color: #262626;
          }
          .group:hover > div {
            transform: translateY(0) !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturedGrid;
