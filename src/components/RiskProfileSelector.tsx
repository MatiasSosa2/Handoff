import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const RiskProfileSelector = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const [riskLevel, setRiskLevel] = useState(50);
  const isDragging = useRef(false);

  const riskProfiles = [
    { value: 0, label: 'Conservador', color: '#F5F2ED', word: 'SEGURIDAD', textColor: '#262626', accentColor: '#3D4035', wordOpacity: 0.12 },
    { value: 50, label: 'Balanceado', color: '#FFFFFF', word: 'EQUILIBRIO', textColor: '#262626', accentColor: '#C2A37E', wordOpacity: 0.08 },
    { value: 100, label: 'Agresivo', color: '#262626', word: 'OPORTUNIDAD', textColor: '#F5F2ED', accentColor: '#C2A37E', wordOpacity: 0.15 },
  ];

  const getCurrentProfile = () => {
    if (riskLevel < 33) return riskProfiles[0];
    if (riskLevel < 67) return riskProfiles[1];
    return riskProfiles[2];
  };

  useGSAP(() => {
    // Animate liquid path
    gsap.to(liquidRef.current, {
      attr: { d: generateLiquidPath(riskLevel) },
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });

    // Change background color
    gsap.to(sliderRef.current, {
      backgroundColor: getCurrentProfile().color,
      duration: 1,
      ease: 'power2.out',
    });
  }, [riskLevel]);

  const generateLiquidPath = (value: number) => {
    const width = 100;
    const height = 6;
    const progress = value;
    
    // Create organic liquid shape
    const wobble1 = Math.sin(Date.now() * 0.002) * 0.5;
    const wobble2 = Math.cos(Date.now() * 0.003) * 0.3;
    
    return `
      M 0,${height/2}
      Q ${progress * 0.25},${height/2 + wobble1} ${progress * 0.5},${height/2}
      T ${progress},${height/2 + wobble2}
      L ${progress},${height}
      L 0,${height}
      Z
    `;
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setRiskLevel(percentage);
  };

  const currentProfile = getCurrentProfile();

  return (
    <section className="py-32 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: currentProfile.color }}>
      {/* Background Word */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ 
          fontSize: 'clamp(120px, 20vw, 280px)',
          opacity: currentProfile.wordOpacity,
          fontWeight: 900,
          color: currentProfile.accentColor,
          letterSpacing: '0.05em'
        }}
      >
        {currentProfile.word}
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className="text-xs tracking-[0.4em] uppercase mb-4 block transition-colors duration-500 font-semibold"
            style={{ color: currentProfile.accentColor }}
          >
            Selector de Perfil Interactivo
          </span>
          <h2 
            className="text-5xl md:text-6xl font-light mb-4 tracking-tight transition-colors duration-500"
            style={{ color: currentProfile.textColor }}
          >
            Defina su <span className="font-bold italic" style={{ color: currentProfile.accentColor }}>Horizonte</span>
          </h2>
          <p 
            className="text-lg font-medium max-w-2xl mx-auto transition-colors duration-500"
            style={{ color: currentProfile.textColor, opacity: 0.8 }}
          >
            Deslice el control para ajustar su perfil: <span className="font-bold" style={{ color: currentProfile.accentColor }}>Izquierda = Seguridad, Derecha = Oportunidad</span>
          </p>
        </div>

        {/* Liquid Slider */}
        <div 
          ref={sliderRef}
          className="relative h-32 rounded-full mb-12 cursor-grab active:cursor-grabbing transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(194,163,126,0.4)]"
          style={{ 
            backgroundColor: currentProfile.value === 100 ? 'rgba(194, 163, 126, 0.2)' : currentProfile.value < 33 ? 'rgba(61, 64, 53, 0.15)' : 'rgba(194, 163, 126, 0.12)',
            border: `3px solid ${currentProfile.accentColor}`,
            borderStyle: 'solid',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {/* SVG Liquid */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 6" preserveAspectRatio="none">
            <path
              ref={liquidRef}
              d={generateLiquidPath(riskLevel)}
              fill="#C2A37E"
              opacity="0.3"
            />
          </svg>

          {/* Draggable Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-grab active:cursor-grabbing"
            style={{ 
              left: `calc(${riskLevel}% - 40px)`,
              background: `linear-gradient(135deg, ${currentProfile.accentColor} 0%, #C2A37E 100%)`,
              boxShadow: `0 0 50px ${currentProfile.accentColor}99, 0 4px 20px rgba(0,0,0,0.3)`,
              border: '4px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
          </div>

          {/* Markers */}
          {riskProfiles.map((profile) => {
            const isActive = currentProfile.value === profile.value;
            return (
              <div
                key={profile.value}
                className="absolute top-full mt-6 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${profile.value}%` }}
              >
                <div 
                  className="w-1.5 h-6 mb-2 mx-auto transition-all duration-500 rounded-full"
                  style={{ 
                    backgroundColor: isActive ? currentProfile.accentColor : currentProfile.textColor,
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'scaleY(1.2)' : 'scaleY(1)'
                  }}
                />
                <span 
                  className="text-sm font-bold tracking-wider whitespace-nowrap transition-all duration-500"
                  style={{ 
                    color: currentProfile.textColor,
                    opacity: isActive ? 1 : 0.5,
                    fontSize: isActive ? '0.9rem' : '0.875rem'
                  }}
                >
                  {profile.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Selection Badge */}
        <div className="text-center">
          <div 
            className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl transition-all duration-500 shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${currentProfile.accentColor}30 0%, ${currentProfile.accentColor}15 100%)`,
              border: `3px solid ${currentProfile.accentColor}`,
              boxShadow: `0 0 30px ${currentProfile.accentColor}40`
            }}
          >
            <span 
              className="text-sm font-bold tracking-widest uppercase transition-colors duration-500"
              style={{ color: currentProfile.textColor, opacity: 0.7 }}
            >
              Perfil Seleccionado:
            </span>
            <span 
              className="text-2xl font-bold tracking-wide transition-colors duration-500"
              style={{ color: currentProfile.accentColor }}
            >
              {currentProfile.label}
            </span>
          </div>
          
          {/* Visual Indicator */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: currentProfile.textColor, opacity: 0.6 }}>Seguridad</div>
              <div className="h-2 w-20 bg-gradient-to-r from-transparent to-olive/30 rounded-full" />
            </div>
            <div 
              className="w-4 h-4 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: currentProfile.accentColor,
                boxShadow: `0 0 20px ${currentProfile.accentColor}`,
                transform: `translateX(${(riskLevel - 50) * 0.8}px)`
              }}
            />
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: currentProfile.textColor, opacity: 0.6 }}>Oportunidad</div>
              <div className="h-2 w-20 bg-gradient-to-l from-transparent to-gold/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskProfileSelector;
