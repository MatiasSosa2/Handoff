import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlueprintWalkthrough = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const rooms = [
    {
      id: 'master',
      name: 'Master Suite Norte',
      number: '01',
      x: '70%',
      y: '30%',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      description: 'Suite principal de 45m² con vestidor y baño de mármol. Orientación norte con vista panorámica.',
      features: ['Walk-in closet', 'Baño en suite', 'Balcón privado']
    },
    {
      id: 'living',
      name: 'Living Integrado',
      number: '02',
      x: '35%',
      y: '50%',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      description: 'Ambiente social de 60m² con doble altura y ventilación cruzada. Conexión directa con galería.',
      features: ['Doble altura', 'Luz natural', 'Galería integrada']
    },
    {
      id: 'kitchen',
      name: 'Cocina de Autor',
      number: '03',
      x: '50%',
      y: '65%',
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80',
      description: 'Cocina premium con isla central y electrodomésticos de línea profesional.',
      features: ['Isla central', 'Electrodomésticos Miele', 'Bodega climatizada']
    },
    {
      id: 'terrace',
      name: 'Terraza Panorámica',
      number: '04',
      x: '75%',
      y: '70%',
      image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80',
      description: '40m² de terraza con parrilla integrada y deck de madera. Vista 360°.',
      features: ['Parrilla integrada', 'Deck de madera', 'Vista 360°']
    },
  ];

  useGSAP(() => {
    // Animación del trazo del plano - Dibujo línea por línea
    gsap.fromTo('.blueprint-svg rect, .blueprint-svg path, .blueprint-svg line, .blueprint-svg text', 
      { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
      { 
        strokeDashoffset: 0,
        opacity: 1,
        duration: 3, 
        ease: 'power2.inOut',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.blueprint-container',
          start: 'top 60%',
          once: true,
        }
      }
    );

    gsap.fromTo('.blueprint-container',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blueprint-container',
          start: 'top 70%',
          once: true,
        }
      }
    );

    gsap.fromTo('.room-info',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.room-info',
          start: 'top 75%',
          once: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-[#121212] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 border border-gold/30 text-gold tracking-[0.3em] text-xs uppercase font-bold mb-6">
            Anatomía del Espacio
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
            Distribución <span className="text-gold italic font-serif">Funcional</span>
          </h2>
          <p className="text-white/80 text-lg font-light max-w-2xl mx-auto">
            Cada espacio está diseñado para maximizar luz natural y circulación fluida
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado izquierdo: El Plano */}
          <div className="blueprint-container relative group">
            <div className="border border-white/10 p-8 bg-charcoal/50 backdrop-blur-sm">
              {/* Blueprint base */}
              <div className="relative aspect-square">
                <svg className="blueprint-svg w-full h-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" viewBox="0 0 400 400" fill="none">
                  {/* Grid background */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C2A37E" strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                  
                  {/* Plano arquitectónico simplificado */}
                  <rect x="50" y="50" width="300" height="300" stroke="#C2A37E" strokeWidth="2" fill="none" opacity="0.6" />
                  <rect x="50" y="50" width="150" height="120" stroke="#C2A37E" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <rect x="200" y="50" width="150" height="120" stroke="#C2A37E" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <rect x="50" y="170" width="120" height="90" stroke="#C2A37E" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <rect x="170" y="170" width="180" height="90" stroke="#C2A37E" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <rect x="50" y="260" width="300" height="90" stroke="#C2A37E" strokeWidth="1.5" fill="none" opacity="0.4" />
                  
                  {/* Anotaciones */}
                  <text x="125" y="110" fill="#FFFFFF" fontSize="11" textAnchor="middle" opacity="0.9">LIVING</text>
                  <text x="275" y="110" fill="#FFFFFF" fontSize="11" textAnchor="middle" opacity="0.9">MASTER</text>
                  <text x="110" y="215" fill="#FFFFFF" fontSize="11" textAnchor="middle" opacity="0.9">COCINA</text>
                  <text x="200" y="305" fill="#FFFFFF" fontSize="11" textAnchor="middle" opacity="0.9">TERRAZA</text>
                </svg>

                {/* Puntos calientes interactivos */}
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="absolute cursor-pointer group/room"
                    style={{ left: room.x, top: room.y, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setActiveRoom(room.id)}
                    onMouseLeave={() => setActiveRoom(null)}
                  >
                    <div className={`relative transition-all duration-300 ${
                      activeRoom === room.id ? 'scale-125' : ''
                    }`}>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-gold/50 animate-ping" />
                      
                      {/* Hot spot */}
                      <div className="relative w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-xl" style={{
                        boxShadow: '0 0 20px rgba(194, 163, 126, 0.8), 0 0 40px rgba(194, 163, 126, 0.4)'
                      }}>
                        <span className="text-charcoal text-xs font-bold font-mono">{room.number}</span>
                      </div>
                    </div>

                    {/* Mini tooltip */}
                    {activeRoom === room.id && (
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold px-3 py-1 text-charcoal text-xs font-semibold pointer-events-none">
                        {room.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leyenda */}
            <div className="mt-6 text-white/80 text-xs uppercase tracking-wider text-center">
              Hover sobre los puntos para explorar
            </div>
          </div>

          {/* Lado derecho: Descripción del Lifestyle */}
          <div className="space-y-8">
            <div className="room-info">
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                Espacios diseñados para el <span className="text-gold italic font-serif">bienestar</span>
              </h3>
              <p className="text-white/80 leading-relaxed text-lg font-light mb-8">
                Cada unidad prioriza la circulación fluida y la ventilación cruzada, eliminando pasillos innecesarios para maximizar la entrada de luz natural en los sectores sociales.
              </p>
            </div>

            {/* Room Details - Cambia según hover */}
            {activeRoom ? (
              <div className="room-info bg-olive/10 border border-gold/20 p-8 transition-all duration-300">
                {rooms.find(r => r.id === activeRoom) && (
                  <>
                    <div className="aspect-video mb-4 overflow-hidden">
                      <img 
                        src={rooms.find(r => r.id === activeRoom)!.image} 
                        alt={rooms.find(r => r.id === activeRoom)!.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-gold text-3xl font-light font-mono">{rooms.find(r => r.id === activeRoom)!.number}</span>
                      <h4 className="text-white text-xl font-semibold">{rooms.find(r => r.id === activeRoom)!.name}</h4>
                    </div>
                    <p className="text-white/80 text-sm mb-4">{rooms.find(r => r.id === activeRoom)!.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {rooms.find(r => r.id === activeRoom)!.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-gold/20 text-gold text-xs font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <div 
                    key={room.id}
                    className="room-info cursor-pointer group"
                    onMouseEnter={() => setActiveRoom(room.id)}
                  >
                    <span className="block text-gold text-3xl font-light mb-2 font-mono">{room.number}</span>
                    <span className="text-white/80 text-sm uppercase tracking-widest group-hover:text-gold transition-colors">
                      {room.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintWalkthrough;
