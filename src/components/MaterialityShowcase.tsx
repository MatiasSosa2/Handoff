import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MaterialityShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const materials = [
    {
      id: 1,
      name: 'Mármol de Carrara',
      origin: 'Italia',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80',
      description: 'Vetas naturales únicas en cada pieza'
    },
    {
      id: 2,
      name: 'Roble Europeo',
      origin: 'Francia',
      image: 'https://images.unsplash.com/photo-1615875474908-c76f44c9a484?w=800&q=80',
      description: 'Ingeniería de precisión alemana'
    },
    {
      id: 3,
      name: 'Grifería Axor',
      origin: 'Alemania',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      description: 'Diseño Philippe Starck'
    },
    {
      id: 4,
      name: 'Porcelanato XL',
      origin: 'España',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      description: 'Formato 120x240cm sin juntas'
    },
    {
      id: 5,
      name: 'Vidrio Guardian',
      origin: 'USA',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      description: 'Triple laminado acústico'
    },
    {
      id: 6,
      name: 'Acero Inoxidable',
      origin: 'Japón',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      description: 'Acabado mirror pulido a mano'
    },
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // Parallax horizontal scroll sin pin para evitar el bug de desaparición
    const scrollContainer = containerRef.current.querySelector('.materials-scroll');
    
    gsap.to(scrollContainer, {
      x: '-50%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Animación de revelado de bloque dorado para el texto
    gsap.utils.toArray('.material-overlay').forEach((overlay: any) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.fromTo(overlay.querySelector('.reveal-block'),
        { x: '-100%' },
        { x: '100%', duration: 0.8, ease: 'power2.inOut' }
      ).fromTo(overlay.querySelectorAll('.reveal-text'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
      
      overlay.addEventListener('mouseenter', () => tl.play());
      overlay.addEventListener('mouseleave', () => tl.reverse());
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen bg-gradient-to-b from-parchment via-parchment to-taupe/30 overflow-hidden relative py-32">
      {/* Header Fixed */}
      <div className="relative z-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-6 py-2 border border-gold/30 text-charcoal tracking-[0.3em] text-xs uppercase font-bold mb-6 bg-white/70 backdrop-blur-sm">
            Calidad Táctil
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-charcoal tracking-tight">
            Materialidad <span className="text-gold italic font-serif">Premium</span>
          </h2>
        </div>
      </div>

      {/* Scrolling Materials */}
      <div className="materials-scroll absolute top-1/2 -translate-y-1/2 flex gap-8 pl-[10%]">
        {[...materials, ...materials].map((material, index) => (
          <div
            key={`${material.id}-${index}`}
            className="flex-shrink-0 w-[400px] md:w-[500px] group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal shadow-2xl">
              <img
                src={material.image}
                alt={material.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Tipografía masiva de fondo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="text-[15rem] font-black text-white/3 leading-none tracking-tighter">
                  {material.name.charAt(0)}
                </div>
              </div>
              
              {/* Overlay Info con revelado */}
              <div className="material-overlay absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Bloque de revelado dorado */}
                <div className="reveal-block absolute inset-0 bg-gold/30 -translate-x-full" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="reveal-text flex items-center gap-2 mb-2">
                    <div className="w-1 h-8 bg-gold" />
                    <span className="text-gold text-xs uppercase tracking-wider font-bold">
                      {material.origin}
                    </span>
                  </div>
                  <h3 className="reveal-text text-white text-3xl font-light mb-2 tracking-tight">
                    {material.name}
                  </h3>
                  <p className="reveal-text text-white/70 text-sm font-light">
                    {material.description}
                  </p>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 px-2">
              <div className="text-charcoal font-bold text-lg">{material.name}</div>
              <div className="text-taupe text-sm">{material.origin}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-taupe">
        <div className="text-xs uppercase tracking-wider font-semibold">Desliza</div>
        <svg className="w-6 h-6 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default MaterialityShowcase;
