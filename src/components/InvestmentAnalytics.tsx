import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InvestmentAnalytics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeAsset, setActiveAsset] = useState('real-estate');

  const assetsData = {
    'real-estate': [
      { name: 'Recoleta', roi: '+32%', trend: [12, 15, 18, 22, 28, 32], status: 'up' },
      { name: 'Palermo', roi: '+28%', trend: [10, 13, 16, 20, 24, 28], status: 'up' },
      { name: 'Puerto Madero', roi: '+35%', trend: [15, 18, 22, 26, 31, 35], status: 'up' },
      { name: 'Belgrano', roi: '+24%', trend: [8, 11, 14, 18, 21, 24], status: 'up' },
    ],
    'sp500': [
      { name: 'Tech Sector', roi: '+45%', trend: [18, 22, 28, 35, 41, 45], status: 'up' },
      { name: 'Healthcare', roi: '+22%', trend: [8, 11, 14, 17, 20, 22], status: 'up' },
      { name: 'Finance', roi: '+31%', trend: [12, 16, 20, 25, 29, 31], status: 'up' },
      { name: 'Energy', roi: '+19%', trend: [6, 9, 12, 15, 17, 19], status: 'up' },
    ],
    'gold': [
      { name: 'Oro Físico', roi: '+18%', trend: [5, 8, 11, 14, 16, 18], status: 'up' },
      { name: 'ETFs Oro', roi: '+16%', trend: [4, 7, 10, 12, 14, 16], status: 'up' },
      { name: 'Mineras Oro', roi: '+25%', trend: [8, 12, 16, 20, 23, 25], status: 'up' },
      { name: 'Futuros Oro', roi: '+21%', trend: [7, 10, 13, 17, 19, 21], status: 'up' },
    ],
  };

  const zones = assetsData[activeAsset as keyof typeof assetsData];

  const assets = [
    { id: 'real-estate', name: 'Real Estate', value: 156, color: '#C2A37E' },
    { id: 'sp500', name: 'S&P 500', value: 118, color: '#A69F92' },
    { id: 'gold', name: 'Oro', value: 89, color: '#3D4035' },
  ];

  useGSAP(() => {
    // Animate counter
    const counters = gsap.utils.toArray<HTMLElement>('.roi-counter');
    counters.forEach((counter) => {
      // const target = parseFloat(counter.getAttribute('data-target') || '0');
      gsap.from(counter, {
        textContent: 0,
        duration: 2,
        ease: 'power1.inOut',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function() {
          counter.textContent = Math.ceil(parseFloat(counter.textContent || '0')).toString() + '%';
        }
      });
    });

    // Sparkline animations
    gsap.from('.sparkline-path', {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      duration: 2,
      ease: 'power2.inOut',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.analytics-grid',
        start: 'top 70%',
        once: true,
      },
    });
  }, []);

  const renderSparkline = (data: number[]) => {
    const width = 120;
    const height = 40;
    const max = Math.max(...data);
    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (value / max) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="sparkline">
        <polyline
          className="sparkline-path"
          fill="none"
          stroke="#C2A37E"
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <section ref={sectionRef} className="py-32 bg-charcoal relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #C2A37E 0.5px, transparent 0.5px), linear-gradient(to bottom, #C2A37E 0.5px, transparent 0.5px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-gold font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
            Market Intelligence Terminal
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-parchment mb-4 tracking-tight">
            Análisis de <span className="font-bold text-gold italic">Mercado Real-Time</span>
          </h2>
          <p className="text-taupe text-lg font-light max-w-2xl">
            Data institucional para decisiones de inversión informadas. Proyecciones basadas en rendimiento histórico y análisis comparativo de activos.
          </p>
        </div>

        {/* Asset Toggle */}
        <div className="flex gap-3 mb-12">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setActiveAsset(asset.id)}
              className={`px-8 py-4 font-mono text-sm font-bold tracking-wider transition-all duration-300 border-2 ${
                activeAsset === asset.id
                  ? 'bg-gold text-charcoal border-gold shadow-[0_0_20px_rgba(194,163,126,0.4)]'
                  : 'bg-white text-charcoal border-white/80 hover:border-gold hover:shadow-lg'
              }`}
            >
              {asset.name}
              <span className="ml-3 font-bold" style={{ color: activeAsset === asset.id ? '#262626' : asset.color }}>
                {asset.value}
              </span>
            </button>
          ))}
        </div>

        {/* Analytics Grid */}
        <div className="analytics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="zone-card bg-white border-2 border-gold/40 p-6 hover:border-gold transition-all duration-500 group shadow-2xl relative"
            >
              {/* Zone Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-charcoal font-bold text-xl mb-1">{zone.name}</h3>
                  <p className="text-olive text-xs font-bold tracking-wider uppercase">ROI 24M</p>
                </div>
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} className="text-charcoal" />
                </div>
              </div>

              {/* ROI Counter */}
              <div 
                className="roi-counter text-5xl font-bold text-gold mb-4 font-mono"
                data-target={zone.roi.replace('%', '').replace('+', '')}
              >
                0%
              </div>

              {/* Sparkline */}
              <div className="mb-4">
                {renderSparkline(zone.trend)}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs border-t border-olive/20 pt-3">
                <span className="text-taupe font-semibold">Últimos 6 meses</span>
                <div className="flex items-center gap-1 text-olive font-bold">
                  <Activity size={14} />
                  <span className="font-mono">+{zone.trend[zone.trend.length - 1] - zone.trend[0]}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Terminal */}
        <div className="mt-16 bg-white border-2 border-gold/40 p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <BarChart3 size={24} className="text-charcoal" />
                </div>
                <h3 className="text-charcoal text-2xl font-bold">Informe Completo de Mercado</h3>
              </div>
              <p className="text-taupe text-base font-medium">
                Acceda al análisis institucional completo con proyecciones macro y micro-mercado.
              </p>
            </div>
            <button className="px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,163,126,0.6)] hover:scale-105 whitespace-nowrap border-2 border-gold">
              Solicitar Dossier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentAnalytics;
