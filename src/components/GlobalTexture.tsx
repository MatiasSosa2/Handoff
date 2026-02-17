const GlobalTexture = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ willChange: 'transform' }}>
      {/* 1. Capa de Ruido (Grano de película) - Optimizada */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          backgroundRepeat: 'repeat',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />

      {/* 2. Rejilla Arquitectónica (Líneas verticales de 0.5px) - Optimizada */}
      <div className="absolute inset-0 opacity-[0.05] flex justify-around px-8 max-w-[1920px] mx-auto" style={{ transform: 'translateZ(0)' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[0.5px] h-full bg-taupe" style={{ transform: 'translateZ(0)' }} />
        ))}
      </div>
      
      {/* 3. Viñeteado Sutil (Profundidad en las esquinas) - Optimizada */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(38,38,38,0.03)_100%)]" style={{ transform: 'translateZ(0)' }} />
    </div>
  );
};

export default GlobalTexture;
