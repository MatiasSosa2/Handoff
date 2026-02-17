import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Testimonials = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // 30+ testimonios aleatorios
  const testimonials = [
    { quote: "Encontramos nuestra propiedad soñada gracias a HANDOFF. Proceso impecable.", author: "María González", avatar: "https://i.pravatar.cc/150?img=1" },
    { quote: "El mejor servicio inmobiliario que he experimentado. Totalmente profesional.", author: "Carlos Martínez", avatar: "https://i.pravatar.cc/150?img=2" },
    { quote: "Inversión segura y rentable. Los recomiendo sin dudarlo.", author: "Laura Fernández", avatar: "https://i.pravatar.cc/150?img=3" },
    { quote: "Atención personalizada de primer nivel. Superaron todas mis expectativas.", author: "Roberto Silva", avatar: "https://i.pravatar.cc/150?img=4" },
    { quote: "Transparencia absoluta en cada paso del proceso. Excelente equipo.", author: "Ana Patricia López", avatar: "https://i.pravatar.cc/150?img=5" },
    { quote: "Propiedades exclusivas que no encontrarás en otro lado. Vale la pena.", author: "Diego Ramírez", avatar: "https://i.pravatar.cc/150?img=6" },
    { quote: "Mi familia está encantada con nuestra nueva casa. Gracias HANDOFF.", author: "Sofía Méndez", avatar: "https://i.pravatar.cc/150?img=7" },
    { quote: "ROI excepcional en menos de 2 años. Inversión muy bien asesorada.", author: "Javier Torres", avatar: "https://i.pravatar.cc/150?img=8" },
    { quote: "El proceso legal fue manejado de forma impecable. Sin sorpresas.", author: "Valentina Ruiz", avatar: "https://i.pravatar.cc/150?img=9" },
    { quote: "Acceso a propiedades off-market que cambiaron mi portfolio.", author: "Martín Sánchez", avatar: "https://i.pravatar.cc/150?img=10" },
    { quote: "Servicio white glove real. Atención a cada detalle.", author: "Carolina Díaz", avatar: "https://i.pravatar.cc/150?img=11" },
    { quote: "La mejor decisión de inversión que tomé este año.", author: "Fernando Castro", avatar: "https://i.pravatar.cc/150?img=12" },
    { quote: "Profesionalismo y discreción en todo momento. Impresionante.", author: "Isabel Morales", avatar: "https://i.pravatar.cc/150?img=13" },
    { quote: "Asesoramiento de primer nivel. Conocen el mercado perfectamente.", author: "Andrés Vargas", avatar: "https://i.pravatar.cc/150?img=14" },
    { quote: "Proceso rápido y eficiente. Sin complicaciones.", author: "Camila Rojas", avatar: "https://i.pravatar.cc/150?img=15" },
    { quote: "Encontré exactamente lo que buscaba. Recomendados al 100%.", author: "Ricardo Herrera", avatar: "https://i.pravatar.cc/150?img=16" },
    { quote: "La atención post-venta es tan buena como la pre-venta.", author: "Gabriela Ortiz", avatar: "https://i.pravatar.cc/150?img=17" },
    { quote: "Portfolio de propiedades premium inigualable.", author: "Lucas Navarro", avatar: "https://i.pravatar.cc/150?img=18" },
    { quote: "Inversión segura con retornos comprobables. Muy satisfecho.", author: "Paula Jiménez", avatar: "https://i.pravatar.cc/150?img=19" },
    { quote: "El equipo más preparado del mercado inmobiliario.", author: "Sebastián Flores", avatar: "https://i.pravatar.cc/150?img=20" },
    { quote: "Transparencia y honestidad en cada interacción.", author: "Victoria Peña", avatar: "https://i.pravatar.cc/150?img=21" },
    { quote: "Propiedades únicas con un potencial de valorización increíble.", author: "Nicolás Ramírez", avatar: "https://i.pravatar.cc/150?img=22" },
    { quote: "La experiencia más profesional en compra de inmuebles.", author: "Daniela Cruz", avatar: "https://i.pravatar.cc/150?img=23" },
    { quote: "Excelente asesoramiento legal y financiero incluido.", author: "Tomás Medina", avatar: "https://i.pravatar.cc/150?img=24" },
    { quote: "Superaron todas mis expectativas. Altamente recomendable.", author: "Mariana Vega", avatar: "https://i.pravatar.cc/150?img=25" },
    { quote: "El mejor lugar para invertir en real estate de lujo.", author: "Federico Romero", avatar: "https://i.pravatar.cc/150?img=26" },
    { quote: "Proceso completamente digital y eficiente.", author: "Julieta Mendoza", avatar: "https://i.pravatar.cc/150?img=27" },
    { quote: "Confianza absoluta desde el primer contacto.", author: "Maximiliano Gil", avatar: "https://i.pravatar.cc/150?img=28" },
    { quote: "Portfolio diversificado gracias a sus recomendaciones.", author: "Florencia Álvarez", avatar: "https://i.pravatar.cc/150?img=29" },
    { quote: "Atención 24/7 y respuesta inmediata. Impecable.", author: "Santiago Reyes", avatar: "https://i.pravatar.cc/150?img=30" },
    { quote: "La inversión más inteligente que hice en años.", author: "Lucía Castro", avatar: "https://i.pravatar.cc/150?img=31" },
    { quote: "Servicio premium que realmente vale cada centavo.", author: "Emiliano Torres", avatar: "https://i.pravatar.cc/150?img=32" },
  ];

  useGSAP(() => {
    // Infinite carousel - Row 1 (Left to Right)
    if (row1Ref.current) {
      gsap.to(row1Ref.current, {
        x: '-50%',
        duration: 60,
        ease: 'none',
        repeat: -1,
      });
    }

    // Infinite carousel - Row 2 (Right to Left)
    if (row2Ref.current) {
      gsap.fromTo(row2Ref.current,
        { x: '-50%' },
        {
          x: '0%',
          duration: 60,
          ease: 'none',
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <section className="py-32 bg-parchment overflow-hidden">
      <div className="mb-16 text-center px-6">
        <p className="text-[10px] font-semibold tracking-[0.35em] text-olive mb-6 uppercase">
          Testimonios
        </p>
        <h2 className="text-5xl md:text-6xl font-light text-charcoal mb-4 tracking-tight">
          Lo que Dicen Nuestros <span className="font-normal text-olive italic">Clientes</span>
        </h2>
      </div>

      {/* Row 1 - Moving Right */}
      <div className="mb-6 overflow-hidden">
        <div ref={row1Ref} className="flex gap-4" style={{ width: '200%' }}>
          {/* Duplicate for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ width: '340px', height: '180px' }}
            >
              <p className="text-sm font-bold text-charcoal mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="bg-[#87CEEB]/20 px-3 py-1.5 rounded-full">
                  <p className="text-xs font-semibold text-[#4A9FD8]">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moving Left */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex gap-4" style={{ width: '200%' }}>
          {/* Duplicate for seamless loop */}
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ width: '340px', height: '180px' }}
            >
              <p className="text-sm font-bold text-charcoal mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="bg-[#87CEEB]/20 px-3 py-1.5 rounded-full">
                  <p className="text-xs font-semibold text-[#4A9FD8]">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
