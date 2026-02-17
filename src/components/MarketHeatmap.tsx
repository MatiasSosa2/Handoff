import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrendingUp } from 'lucide-react';

const MarketHeatmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    { 
      id: 'nordelta', 
      name: 'Nordelta', 
      appreciation: '+28%', 
      rental: '4.2%',
      x: '65%', 
      y: '35%',
      description: 'Hub residencial de mayor crecimiento',
      projects: 12
    },
    { 
      id: 'palermo', 
      name: 'Palermo', 
      appreciation: '+18%', 
      rental: '3.8%',
      x: '45%', 
      y: '55%',
      description: 'Zona premium consolidada',
      projects: 8
    },
    { 
      id: 'costa', 
      name: 'Costa Atlántica', 
      appreciation: '+32%', 
      rental: '5.1%',
      x: '85%', 
      y: '75%',
      description: 'Potencial turístico en alza',
      projects: 15
    },
    { 
      id: 'recoleta', 
      name: 'Recoleta', 
      appreciation: '+15%', 
      rental: '3.2%',
      x: '40%', 
      y: '45%',
      description: 'Elegancia histórica',
      projects: 5
    },
    { 
      id: 'puerto', 
      name: 'Puerto Madero', 
      appreciation: '+22%', 
      rental: '4.5%',
      x: '50%', 
      y: '60%',
      description: 'Inversión corporativa',
      projects: 10
    },
  ];

  useGSAP(() => {
    gsap.fromTo('.zone-node',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );

    gsap.fromTo('.pulse-ring',
      { scale: 1, opacity: 0.8 },
      {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-charcoal/95 px-6 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#C2A37E 1px, transparent 1px), linear-gradient(90deg, #C2A37E 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 border border-gold/30 text-gold tracking-[0.3em] text-xs uppercase font-bold mb-6">
            Market Intelligence
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
            Mapa de <span className="text-gold italic font-serif">Oportunidades</span>
          </h2>
          <p className="text-parchment/60 text-lg font-light max-w-2xl mx-auto">
            Visualización en tiempo real de zonas con mayor plusvalía estimada
          </p>
        </div>

        {/* Interactive Heatmap */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-charcoal via-charcoal/80 to-olive/20 rounded-lg border border-gold/10 overflow-hidden">
          {/* Map illustration (abstracción geométrica) */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 500" fill="none">
              <path d="M100 100 Q 400 50, 700 100 T 700 400 Q 400 450, 100 400 T 100 100" 
                    stroke="#C2A37E" strokeWidth="2" opacity="0.3" />
              <circle cx="400" cy="250" r="150" stroke="#C2A37E" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>

          {/* Zone Nodes */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="zone-node absolute cursor-pointer group"
              style={{ left: zone.x, top: zone.y, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActiveZone(zone.id)}
              onMouseLeave={() => setActiveZone(null)}
            >
              {/* Pulse ring */}
              <div className="pulse-ring absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-gold/50" />
              
              {/* Node */}
              <div className={`relative w-16 h-16 rounded-full transition-all duration-300 ${
                activeZone === zone.id ? 'bg-gold scale-125' : 'bg-gold/60'
              } flex items-center justify-center shadow-2xl`}>
                <TrendingUp size={24} className="text-charcoal" />
              </div>

              {/* Info Card */}
              <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-charcoal/95 backdrop-blur-xl border border-gold/30 p-6 rounded-lg transition-all duration-300 ${
                activeZone === zone.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <h3 className="text-white font-bold text-lg mb-2">{zone.name}</h3>
                <p className="text-parchment/60 text-sm mb-4">{zone.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gold text-2xl font-bold">{zone.appreciation}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">Plusvalía</div>
                  </div>
                  <div>
                    <div className="text-gold text-2xl font-bold">{zone.rental}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">Renta Anual</div>
                  </div>
                </div>

                <div className="text-white/40 text-xs">
                  {zone.projects} proyectos disponibles
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold" />
            <span>Zona de alta plusvalía</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold/40" />
            <span>Oportunidad emergente</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketHeatmap;
