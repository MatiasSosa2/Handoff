import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Lifestyle = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refreshTrigger);

    // Animaciones sutiles para los nuevos paneles
    const panels = gsap.utils.toArray('.luxury-panel');
    panels.forEach((panel: any) => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    });

    // Animación para los títulos flotantes
    gsap.utils.toArray('.floating-title').forEach((title: any) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: -50,
        ease: "none"
      });
    });

    return () => {
      window.removeEventListener("load", refreshTrigger);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* --- HERO: EL IMPACTO VISUAL --- */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-[#0a0a0a]">
        <h1 className="text-[18vw] font-serif italic leading-none z-10 select-none mix-blend-difference">
          Lifestyle
        </h1>
        <div className="absolute w-[40vw] h-[60vh] z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=2127&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60"
            style={{ minHeight: '60vh' }}
            alt="Interior Art"
          />
        </div>
        <p className="absolute bottom-10 right-10 text-gold uppercase tracking-[0.6em] text-[10px] font-bold">
          Scroll to explore the legacy
        </p>
      </section>

      {/* --- PANEL 1: MATERIALIDAD --- */}
      <section className="panel min-h-screen flex items-center justify-center relative bg-[#0a0a0a] px-8 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-7xl mx-auto items-center gap-8">
          <div className="md:col-span-5 relative">
            <h2 className="text-5xl md:text-7xl font-light leading-none mb-6">
              La Curaduría <br />
              <span className="text-gold italic font-serif">Silenciosa.</span>
            </h2>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              No seleccionamos materiales, elegimos sensaciones táctiles que definen el carácter de un hogar.
            </p>
          </div>
          <div className="md:col-span-7 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Marble detail"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-charcoal/20" />
          </div>
        </div>
        <span className="absolute top-10 md:top-20 left-6 md:left-20 text-[15vw] md:text-[10vw] font-bold text-white/5 select-none pointer-events-none">MATERIA</span>
      </section>

      {/* --- NUEVA SECCIÓN: BIENESTAR INTEGRAL --- */}
      <section className="luxury-panel min-h-screen flex items-center justify-center relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-[#1a1a1a] z-0" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-20 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="overflow-hidden">
                <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold block mb-4 opacity-70">Wellness</span>
                <h2 className="floating-title text-6xl md:text-8xl font-serif italic leading-[0.9]">
                  Espacio para <span className="text-gold">respirar.</span>
                </h2>
              </div>
              
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
                Diseñamos ambientes que curan, espacios que respetan tu ritmo y materiales que acarician los sentidos.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-8">
                {[
                  { title: 'Spas Privados', desc: 'Hidroterapia con vistas panorámicas' },
                  { title: 'Yoga Studios', desc: 'Espacios diseñados para la quietud' },
                  { title: 'Terrazas Vivas', desc: 'Jardines verticales purificadores' },
                  { title: 'Piscinas Infinitas', desc: 'Reflejos que se funden con el horizonte' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="group p-6 border border-white/5 hover:border-gold/20 transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-gold font-mono text-sm">0{index + 1}</span>
                      <span className="text-white/30 group-hover:text-gold transition-colors">↗</span>
                    </div>
                    <h3 className="text-xl font-light mb-2">{item.title}</h3>
                    <p className="text-white/30 text-sm font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Wellness space"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  <span>Ambiente controlado: 22°C • 45% humedad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: EXPERIENCIA GASTRONÓMICA --- */}
      <section className="luxury-panel min-h-screen flex items-center justify-center relative bg-[#0f0f0f]">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="w-full max-w-6xl mx-auto px-8 md:px-20 py-32">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold opacity-70">Epicurean</span>
            <h2 className="text-7xl md:text-8xl font-serif italic mt-4 leading-tight">
              Sabores que <br />
              <span className="text-white/20">definen</span> momentos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2067&auto=format&fit=crop',
                title: 'Cocinas de Autor',
                desc: 'Equipamiento profesional integrado de forma invisible'
              },
              {
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
                title: 'Bodegas Climáticas',
                desc: 'Temperatura y humedad controladas para cada añada'
              },
              {
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
                title: 'Degustaciones Privadas',
                desc: 'Chefs estrellas Michelin en la intimidad de tu hogar'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl h-[400px] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={item.title}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold font-mono text-sm">0{index + 1}</span>
                    <span className="text-white/30 group-hover:text-gold transition-colors transform group-hover:translate-x-2">→</span>
                  </div>
                  <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: CONEXIÓN CON LA NATURALEZA --- */}
      <section className="luxury-panel min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2068&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-20"
            alt="Nature background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-20 py-32 text-center">
          <div className="inline-block mb-12">
            <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold opacity-70">Harmony</span>
          </div>
          
          <h2 className="text-8xl md:text-[10vw] font-serif italic leading-[0.8] mb-12">
            El lujo es <br />
            <span className="text-white/20">paz</span> interior
          </h2>
          
          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-white/50 text-lg font-light leading-relaxed">
              Integramos la naturaleza como material principal. Jardines zen, patios interiores que cambian con las estaciones, y terrazas que se funden con el paisaje.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['Arquitectura Bioclimática', 'Jardines Verticales', 'Estanques Reflectantes', 'Huertos Orgánicos'].map((item, index) => (
              <div 
                key={index} 
                className="px-8 py-4 border border-white/10 rounded-full hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 group cursor-pointer"
              >
                <span className="text-white/70 group-hover:text-gold text-sm font-light tracking-widest uppercase">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FINAL: INVITACIÓN SUTIL --- */}
      <section className="min-h-screen flex items-center justify-center relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-8">
          <div className="max-w-2xl mx-auto">
            <div className="overflow-hidden mb-8">
              <h2 className="text-7xl md:text-8xl font-serif italic leading-[0.9]">
                Tu siguiente <span className="text-gold">capítulo</span>
              </h2>
            </div>
            
            <p className="text-white/40 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
              Descubre un modo de vivir donde cada detalle está pensado para tu bienestar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-12 py-5 overflow-hidden rounded-full bg-transparent border border-white/10 hover:border-gold/30 transition-all duration-500">
                <span className="relative z-10 text-white group-hover:text-gold text-sm font-bold uppercase tracking-[0.3em]">
                  Explorar Propiedades
                </span>
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button className="group flex items-center gap-3 px-8 py-5 text-white/50 hover:text-gold transition-colors duration-500">
                <span className="text-sm font-light uppercase tracking-widest">Solicitar Tour Virtual</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-500">↗</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/10 text-[6vw] font-bold tracking-tighter italic select-none">
          LIFESTYLE
        </div>
      </section>

    </div>
  );
};

export default Lifestyle;
