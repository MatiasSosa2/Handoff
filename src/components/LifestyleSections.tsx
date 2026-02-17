import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LifestyleSections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.reveal-item', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.reveal-item',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
      {/* 1. SECCIÓN SUSCRIPCIÓN - Diseño Minimalista con Fuerte Contraste */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <span className="text-gold tracking-[0.4em] text-xs uppercase font-bold mb-4 block">Newsletter de Autor</span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-8">Reciba la invitación al <span className="text-gold">Círculo Privado</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input 
              type="email" 
              placeholder="Su correo electrónico" 
              className="w-full sm:w-96 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors" 
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest hover:bg-white transition-all duration-500">
              Unirse
            </button>
          </div>
        </div>
      </section>

      {/* 2. CURATORÍA DE MATERIALES - Diseño tipo Grid de Galería */}
      <section className="py-32 bg-parchment px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Curatoría de Materiales</span>
              <h2 className="text-5xl md:text-6xl font-light text-charcoal tracking-tighter">La Estética del <span className="italic font-serif">Valor</span></h2>
            </div>
            <p className="text-taupe max-w-sm text-lg font-light leading-relaxed">
              Cada textura cuenta una historia de procedencia y expresión estética inigualable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/20 border border-gold/20 overflow-hidden">
            {[
              { title: "Mármol Calacatta", origin: "Carrara, Italia", desc: "Vetas doradas naturales sobre base blanca luminosa.", specs: ["Dureza Mohs: 3-4", "Absorción: <0.5%", "Acabado: Espejo"] },
              { title: "Roble Americano", origin: "Tennessee, USA", desc: "Madera noble de 150 años con veta abierta y protección UV.", specs: ["Densidad: 770 kg/m³", "Janka: 1360 lbf", "Clase A"] },
              { title: "Cuero Toscano", origin: "Florencia, Italia", desc: "Curtido vegetal con taninos naturales y pespunte artesanal.", specs: ["Grosor: 2.2mm", "Curtido: Vegetal", "LWG Gold"] },
              { title: "Bronce Oxidado", origin: "Copenhagen, Dinamarca", desc: "Pátina natural desarrollada en 24 meses para detalles únicos.", specs: ["Cu 88%", "Espesor: 3mm", "Living Finish"] }
            ].map((mat, i) => (
              <div key={i} className="bg-parchment p-12 hover:bg-white transition-colors duration-700 group">
                <span className="text-gold/50 text-xs uppercase tracking-widest mb-2 block group-hover:text-gold">{mat.origin}</span>
                <h3 className="text-3xl font-light text-charcoal mb-6">{mat.title}</h3>
                <p className="text-taupe mb-8 font-light">{mat.desc}</p>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-widest">Especificaciones Técnicas</span>
                  <div className="flex flex-wrap gap-4">
                    {mat.specs.map((s, idx) => (
                      <span key={idx} className="text-xs text-charcoal font-medium border-b border-gold/30 pb-1">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PRIVATE CIRCLE - Diseño "Dark Mode" de Lujo */}
      <section className="py-32 bg-charcoal px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="inline-block px-4 py-1 border border-gold text-gold text-[10px] uppercase tracking-[0.5em] mb-6">Membresía</span>
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-6">The <span className="text-gold italic font-serif">Private</span> Circle</h2>
            <p className="text-parchment/50 max-w-xl mx-auto font-light">Acceso irrestricto a una red curada de privilegios diseñados para quienes no aceptan menos que la excelencia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Aviación Privada", sub: "Executive Jets", desc: "Tarifas preferenciales en vuelos charter globales." },
              { name: "Catas Exclusivas", sub: "Bodega Catena Zapata", desc: "Acceso a colecciones limitadas y preventas." },
              { name: "Diseño Interior", sub: "Estudio Humphrey", desc: "Consultoría gratuita inicial de interiorismo." },
              { name: "Seguridad Premium", sub: "Global Security", desc: "Sistemas tácticos de última generación." },
              { name: "Eventos VIP", sub: "HANDOFF Circle", desc: "Networking inmobiliario en locaciones secretas." },
              { name: "Concierge Digital", sub: "24/7 Assistance", desc: "Gestión integral de su vida cotidiana." }
            ].map((item, i) => (
              <div key={i} className="reveal-item border border-white/5 p-10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                <h4 className="text-white text-xl font-medium mb-1">{item.name}</h4>
                <div className="text-gold text-xs uppercase tracking-widest mb-4">{item.sub}</div>
                <p className="text-parchment/40 text-sm font-light leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-8 h-[1px] bg-gold" />
                   <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Exclusive</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-gold p-16 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-charcoal scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl font-light text-charcoal group-hover:text-gold transition-colors duration-500 mb-4">¿Listo para activar su Concierge Digital?</h3>
              <button className="px-12 py-5 border-2 border-charcoal text-charcoal font-bold uppercase tracking-widest group-hover:border-gold group-hover:text-gold transition-all">
                Activar Servicio 24/7
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifestyleSections;
