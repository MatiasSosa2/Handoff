import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SignatureProperty = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Imagen con zoom inverso
    gsap.fromTo('.signature-image',
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.signature-image',
          start: 'top 80%',
          once: true,
        }
      }
    );

    // Texto con revelado de máscara
    gsap.fromTo('.signature-text > *',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.signature-text',
          start: 'top 75%',
          once: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-charcoal px-6">
      <div className="max-w-7xl mx-auto">
        {/* Badge Superior */}
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 border border-gold/30 text-gold tracking-[0.3em] text-xs uppercase font-bold backdrop-blur-sm">
            Selección del Curador
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagen con Mask Animation */}
          <div className="signature-image relative overflow-hidden group aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1600607687940-477a284e6db2?q=80&w=2070" 
              className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
              alt="Propiedad destacada"
            />
            <div className="absolute top-8 left-8 border border-gold/50 p-4 backdrop-blur-md bg-charcoal/30">
              <span className="text-gold tracking-[0.3em] text-xs uppercase font-bold">Pieza Única</span>
            </div>
            
            {/* Overlay con precio */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent">
              <div className="text-6xl font-light text-gold">USD 2.8M</div>
            </div>
          </div>

          {/* Texto Editorial */}
          <div className="signature-text space-y-8">
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
              La Mansión <br /> <span className="text-gold italic font-serif">del Yacht</span>
            </h2>
            <div className="h-px w-24 bg-gold/50" />
            <p className="text-parchment/70 text-lg leading-relaxed max-w-md font-light">
              Ubicada en el corazón de Nordelta, esta residencia no es solo una casa, es un activo financiero blindado con vistas que no tienen precio.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-sm text-white/80 font-light tracking-wide">
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span> 1.200 m² Cubiertos
              </li>
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span> Amarra Privada
              </li>
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span> Wine Cellar 3D
              </li>
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span> Certificación LEED
              </li>
            </ul>
            
            {/* Nota del Curador */}
            <div className="border-l-2 border-gold/30 pl-6 py-4 space-y-2">
              <p className="text-gold/80 text-xs uppercase tracking-widest font-semibold">Nota del Curador</p>
              <p className="text-white/60 text-sm italic leading-relaxed">
                "Rareza arquitectónica que combina diseño náutico con tecnología verde. Potencial de revalorización del 45% en 5 años por nuevo desarrollo urbano en la zona norte."
              </p>
            </div>

            <Link 
              to="/propiedad/1" 
              className="inline-flex items-center text-gold border-b-2 border-gold pb-2 hover:text-white hover:border-white transition-all duration-300 font-semibold tracking-wider"
            >
              EXPLORAR EXPEDIENTE
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureProperty;
