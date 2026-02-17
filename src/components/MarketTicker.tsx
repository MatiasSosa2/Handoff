const MarketTicker = () => {
  const marketData = [
    { zone: 'Puerto Madero', value: '+2.4%', type: 'growth' },
    { zone: 'Recoleta', value: 'USD 4.800/m²', type: 'price' },
    { zone: 'ROI Promedio', value: '12.5%', type: 'roi' },
    { zone: 'Palermo Chico', value: 'USD 5.200/m²', type: 'price' },
    { zone: 'Valorización Anual', value: '+23%', type: 'growth' },
    { zone: 'Nordelta', value: 'USD 3.100/m²', type: 'price' },
    { zone: 'Transacciones 2025', value: '47 ops', type: 'operations' },
    { zone: 'Belgrano R', value: '+1.8%', type: 'growth' },
  ];

  return (
    <div className="w-full bg-olive py-3 overflow-hidden border-y border-gold/20 relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicamos el contenido para loop infinito */}
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex gap-12 items-center px-6">
            {marketData.map((item, i) => (
              <div key={`${groupIndex}-${i}`} className="flex gap-4 items-center text-[10px] tracking-[0.2em] font-medium text-parchment/80 uppercase">
                <span>{item.zone}: <span className="text-gold font-bold">{item.value}</span></span>
                <span className="opacity-30">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
