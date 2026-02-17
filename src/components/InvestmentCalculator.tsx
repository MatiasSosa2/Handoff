import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(10);
  const [selectedZone, setSelectedZone] = useState('nordelta');

  const zones = {
    nordelta: { name: 'Nordelta', appreciation: 6.5, rental: 4.2 },
    palermo: { name: 'Palermo', appreciation: 5.2, rental: 3.8 },
    costa: { name: 'Costa Atlántica', appreciation: 7.1, rental: 5.1 },
    recoleta: { name: 'Recoleta', appreciation: 4.8, rental: 3.2 },
  };

  const calculateReturns = () => {
    const zone = zones[selectedZone as keyof typeof zones];
    const futureValue = investment * Math.pow(1 + zone.appreciation / 100, years);
    const totalRental = investment * (zone.rental / 100) * years;
    const totalReturn = futureValue + totalRental - investment;
    const roi = ((totalReturn / investment) * 100).toFixed(1);
    
    return {
      futureValue: futureValue.toFixed(0),
      totalRental: totalRental.toFixed(0),
      totalReturn: totalReturn.toFixed(0),
      roi
    };
  };

  const results = calculateReturns();

  // Generar puntos para el gráfico
  const generateChartPoints = () => {
    const points = [];
    const zone = zones[selectedZone as keyof typeof zones];
    for (let i = 0; i <= years; i++) {
      const value = investment * Math.pow(1 + zone.appreciation / 100, i);
      points.push({ year: i, value });
    }
    return points;
  };

  const chartPoints = generateChartPoints();
  const maxValue = Math.max(...chartPoints.map(p => p.value));
  const minValue = investment;

  return (
    <section className="py-32 bg-olive/5 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 border border-gold/30 text-gold tracking-[0.3em] text-xs uppercase font-bold mb-6 bg-charcoal/5">
            Calculadora Inteligente
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-charcoal mb-4 tracking-tight">
            Proyecta tu <span className="text-gold italic font-serif">Retorno</span>
          </h2>
          <p className="text-taupe text-lg font-light max-w-2xl mx-auto">
            Simula el rendimiento de tu inversión basado en datos históricos reales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Zona */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-4 uppercase tracking-wider">
                Zona de Inversión
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(zones).map(([key, zone]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedZone(key)}
                    className={`p-4 text-left transition-all duration-300 border-2 ${
                      selectedZone === key
                        ? 'bg-gold border-gold text-charcoal'
                        : 'bg-white border-taupe/20 text-charcoal hover:border-gold/50'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{zone.name}</div>
                    <div className="text-xs opacity-70">{zone.appreciation}% anual</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monto de Inversión */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-4 uppercase tracking-wider">
                Monto de Inversión
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe">
                  <DollarSign size={20} />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="hidden"
                />
                <input
                  type="text"
                  value={`USD ${investment.toLocaleString()}`}
                  readOnly
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-taupe/20 text-charcoal font-bold text-lg focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full mt-4 accent-gold"
              />
            </div>

            {/* Tiempo de Tenencia */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-4 uppercase tracking-wider">
                Tiempo de Tenencia
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-taupe">
                  <Calendar size={20} />
                </div>
                <input
                  type="text"
                  value={`${years} años`}
                  readOnly
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-taupe/20 text-charcoal font-bold text-lg focus:outline-none"
                />
              </div>
              <div className="flex gap-2 mt-4">
                {[5, 10, 15, 20].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`flex-1 py-2 text-sm font-semibold transition-all ${
                      years === y
                        ? 'bg-gold text-charcoal'
                        : 'bg-white text-charcoal hover:bg-gold/10'
                    }`}
                  >
                    {y}a
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Chart */}
          <div className="lg:col-span-3">
            {/* Chart */}
            <div className="bg-charcoal p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
              
              <svg className="w-full h-64" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={40 * i}
                    x2="400"
                    y2={40 * i}
                    stroke="#C2A37E"
                    strokeWidth="0.5"
                    opacity="0.1"
                  />
                ))}

                {/* Chart line */}
                <polyline
                  points={chartPoints.map((p, i) => {
                    const x = (i / chartPoints.length) * 400;
                    const y = 200 - ((p.value - minValue) / (maxValue - minValue)) * 180;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#C2A37E"
                  strokeWidth="3"
                />

                {/* Area under curve */}
                <polygon
                  points={`0,200 ${chartPoints.map((p, i) => {
                    const x = (i / chartPoints.length) * 400;
                    const y = 200 - ((p.value - minValue) / (maxValue - minValue)) * 180;
                    return `${x},${y}`;
                  }).join(' ')} 400,200`}
                  fill="#C2A37E"
                  opacity="0.1"
                />
              </svg>

              <div className="mt-4 text-parchment/60 text-xs uppercase tracking-wider text-center">
                Proyección de Valor • {years} Años
              </div>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 border-2 border-gold/20">
                <div className="flex items-center gap-2 text-taupe mb-2">
                  <TrendingUp size={16} />
                  <span className="text-xs uppercase tracking-wider font-semibold">Valor Futuro</span>
                </div>
                <div className="text-3xl font-bold text-charcoal">
                  USD {Number(results.futureValue).toLocaleString()}
                </div>
              </div>

              <div className="bg-white p-6 border-2 border-gold/20">
                <div className="flex items-center gap-2 text-taupe mb-2">
                  <DollarSign size={16} />
                  <span className="text-xs uppercase tracking-wider font-semibold">Renta Total</span>
                </div>
                <div className="text-3xl font-bold text-charcoal">
                  USD {Number(results.totalRental).toLocaleString()}
                </div>
              </div>

              <div className="col-span-2 bg-gold p-6">
                <div className="text-charcoal/70 text-xs uppercase tracking-wider font-semibold mb-2">
                  Retorno Total Estimado
                </div>
                <div className="text-5xl font-bold text-charcoal mb-2">
                  USD {Number(results.totalReturn).toLocaleString()}
                </div>
                <div className="text-charcoal/70 text-sm">
                  ROI de {results.roi}% en {years} años
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-taupe/60 italic">
              * Proyecciones basadas en datos históricos. Los rendimientos pasados no garantizan resultados futuros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
