import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MaterialsGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const materials = [
    {
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80',
      title: 'Mármol Calacatta',
      origin: 'Carrara, Italia',
      description: 'Vetas doradas naturales sobre base blanca luminosa. Selección premium para baños y cocinas de alta gama.',
      specs: ['Dureza Mohs: 3-4', 'Absorción: <0.5%', 'Acabado: Pulido Espejo'],
    },
    {
      image: 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=1200&q=80',
      title: 'Roble Americano',
      origin: 'Tennessee, USA',
      description: 'Madera noble de 150 años con veta abierta. Acabado mate con protección UV para pisos de alto tráfico.',
      specs: ['Densidad: 770 kg/m³', 'Janka: 1360 lbf', 'Resistencia: Clase A'],
    },
    {
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&q=80',
      title: 'Cuero Toscano',
      origin: 'Florencia, Italia',
      description: 'Curtido vegetal con taninos naturales. Pespunte artesanal a mano para revestimientos y mobiliario.',
      specs: ['Grosor: 2.2mm', 'Curtido: Vegetal', 'Certificación: LWG Gold'],
    },
    {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      title: 'Bronce Oxidado',
      origin: 'Copenhagen, Dinamarca',
      description: 'Aleación de cobre con pátina natural desarrollada en 24 meses. Ideal para herrajes y detalles arquitectónicos.',
      specs: ['Composición: Cu 88%', 'Espesor: 3mm', 'Acabado: Living Finish'],
    },
  ];

  useGSAP(() => {
    // Fade in cards on scroll
    gsap.from('.material-item', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.materials-container',
        start: 'top 70%',
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-parchment relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">
            Curatoría de Materiales
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-charcoal mb-4 tracking-tight">
            La Estética del <span className="font-bold text-olive italic">Valor</span>
          </h2>
          <p className="text-charcoal text-lg font-light max-w-2xl mx-auto">
            Cada material es seleccionado por su procedencia, durabilidad y expresión estética. 
            La calidad no se negocia.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="materials-container grid grid-cols-1 lg:grid-cols-2 gap-8">
          {materials.map((material, index) => (
            <div
              key={index}
              className="material-item group relative bg-white border border-olive/10 overflow-hidden hover:border-gold/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={material.image}
                  alt={material.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'contrast(1.05) saturate(0.95)' }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                {/* Origin Badge */}
                <div className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm px-4 py-2">
                  <span className="text-charcoal text-xs font-semibold tracking-wider uppercase">
                    {material.origin}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-3xl font-light mb-1 tracking-tight">
                    {material.title}
                  </h3>
                </div>
              </div>

              {/* Info Panel */}
              <div className="p-6 bg-white">
                <p className="text-charcoal text-sm leading-relaxed mb-4">
                  {material.description}
                </p>

                {/* Specs Grid */}
                <div className="border-t border-olive/10 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-gold" />
                    <span className="text-xs text-gold font-semibold tracking-wider uppercase">
                      Especificaciones
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {material.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal font-mono">
                        <div className="w-1 h-1 bg-olive/40 rounded-full" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-charcoal p-10 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-light text-parchment mb-3">
                Catálogo Completo de <span className="font-bold text-gold">Acabados Premium</span>
              </h3>
              <p className="text-parchment/90 text-sm mb-6 max-w-lg mx-auto">
                Acceda a nuestra biblioteca técnica con más de 200 materiales curados 
                para proyectos de ultra-lujo.
              </p>
              <button className="px-10 py-4 bg-gold text-charcoal font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,163,126,0.6)] hover:scale-105">
                Solicitar Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsGallery;
