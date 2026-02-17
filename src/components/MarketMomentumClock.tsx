import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrendingUp, Activity } from 'lucide-react';

const MarketMomentumClock = () => {
  const needleRef = useRef<HTMLDivElement>(null);
  const [showSparkline, setShowSparkline] = useState(false);
  const [momentum, setMomentum] = useState(65); // 0-100

  // Simulate market momentum changes
  useEffect(() => {
    const interval = setInterval(() => {
      setMomentum(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(30, Math.min(90, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (needleRef.current) {
      const angle = (momentum / 100) * 180 - 90; // -90 to 90 degrees
      gsap.to(needleRef.current, {
        rotation: angle,
        duration: 2,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, [momentum]);

  const weekTrend = [58, 62, 59, 65, 68, 64, momentum];

  const renderSparkline = () => {
    const width = 100;
    const height = 30;
    const max = Math.max(...weekTrend);
    const min = Math.min(...weekTrend);
    const range = max - min;
    
    const points = weekTrend.map((value, i) => {
      const x = (i / (weekTrend.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke="#C2A37E"
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  const getMomentumStatus = () => {
    if (momentum < 40) return { label: 'Bajo', color: '#A69F92' };
    if (momentum < 70) return { label: 'Moderado', color: '#C2A37E' };
    return { label: 'Alto', color: '#C2A37E' };
  };

  const status = getMomentumStatus();

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowSparkline(true)}
      onMouseLeave={() => setShowSparkline(false)}
    >
      {/* Clock Face */}
      <div className="w-20 h-20 relative bg-white/5 backdrop-blur-md rounded-full border border-gold/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-gold/50 hover:bg-white/10">
        {/* Ticks */}
        {[...Array(7)].map((_, i) => {
          const angle = (i / 6) * 180 - 90;
          const x = Math.cos((angle * Math.PI) / 180) * 28;
          const y = Math.sin((angle * Math.PI) / 180) * 28;
          
          return (
            <div
              key={i}
              className="absolute w-0.5 h-1.5 bg-gold/30"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
              }}
            />
          );
        })}

        {/* Center Dot */}
        <div className="absolute w-1.5 h-1.5 bg-gold rounded-full z-10" />

        {/* Needle */}
        <div
          ref={needleRef}
          className="absolute w-0.5 h-8 bg-gold origin-bottom"
          style={{
            bottom: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rounded-full" />
        </div>

        {/* Icon */}
        <Activity size={12} className="absolute text-gold/50" />
      </div>

      {/* Hover Tooltip */}
      {showSparkline && (
        <div className="absolute top-full right-0 mt-2 bg-charcoal/95 backdrop-blur-md border border-gold/30 p-4 rounded-sm shadow-2xl z-50 animate-fade-in min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-gold" />
            <span className="text-parchment text-xs font-semibold">Market Momentum</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-gold">{Math.round(momentum)}</span>
              <span className="text-xs text-taupe uppercase tracking-wider">{status.label}</span>
            </div>
          </div>

          <div className="mb-2">
            {renderSparkline()}
          </div>

          <div className="text-[10px] text-taupe font-mono tracking-wide">
            Últimos 7 días
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MarketMomentumClock;
