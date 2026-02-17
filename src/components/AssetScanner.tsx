import { useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Points, PointMaterial } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// import * as THREE from 'three';
import { Building2, TrendingUp, MapPin, Calendar } from 'lucide-react';

/* Component disabled for now
const PointCloud = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate architectural point cloud (building-like structure)
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 2.5 + 0.5;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 4;
    
    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(theta) * radius;
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C2A37E"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};
*/

const AssetScanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { 
      icon: TrendingUp,
      label: 'ROI Promedio 24M', 
      value: '+32%',
      description: 'Retorno de inversión histórico'
    },
    { 
      icon: Building2,
      label: 'Activos Auditados', 
      value: '847',
      description: 'Propiedades en portafolio'
    },
    { 
      icon: MapPin,
      label: 'Zonas Premium', 
      value: '12',
      description: 'Ubicaciones estratégicas'
    },
    { 
      icon: Calendar,
      label: 'Disponibilidad', 
      value: 'Q1 2026',
      description: 'Próxima entrega'
    },
  ];

  useGSAP(() => {
    gsap.from('.scanner-title', {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #C2A37E 0.5px, transparent 0.5px), linear-gradient(to bottom, #C2A37E 0.5px, transparent 0.5px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Architectural Analysis Image */}
          <div className="relative h-[500px] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80"
              alt="Análisis Arquitectónico"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'contrast(1.1) saturate(0.9)' }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 via-transparent to-charcoal/60" />
            
            {/* Overlay Frame */}
            <div className="absolute inset-0 border border-gold/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gold" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gold" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gold" />
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-4 bg-charcoal/90 backdrop-blur-md border border-gold/30 px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-xs font-mono tracking-wider uppercase">Sistema Activo</span>
            </div>
          </div>

          {/* Right: Metrics Grid */}
          <div>
            <div className="scanner-title mb-12">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block">
                Intelligence Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-parchment mb-4 tracking-tight">
                Análisis <span className="font-bold text-gold italic">Arquitectónico</span>
              </h2>
              <p className="text-taupe text-lg font-light leading-relaxed">
                Tecnología de precisión institucional para la selección y auditoría de activos inmobiliarios premium.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="metric-card bg-white border-2 border-gold/40 p-6 hover:border-gold transition-all duration-300 group shadow-2xl relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={22} className="text-charcoal" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-olive mb-2 font-bold tracking-wider uppercase">
                          {metric.label}
                        </div>
                        <div className="text-4xl font-bold text-charcoal mb-2 font-mono">
                          {metric.value}
                        </div>
                        <div className="text-sm text-taupe font-medium">
                          {metric.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetScanner;
