import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    // Animaciones de entrada
    gsap.from('.hero-title', {
      scrollTrigger: {
        trigger: '.hero-title',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.info-card', {
      scrollTrigger: {
        trigger: '.info-section',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      x: -40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            alt="Luxury Lobby"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-5xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-serif italic leading-[0.9] mb-6">
            Hablemos de su <br />
            <span className="text-gold">Proyecto</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Nuestro equipo está listo para atenderle y responder todas sus consultas.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-4 block">
                  Contacto
                </span>
                <h2 className="text-4xl font-light mb-6">
                  Envíenos un <span className="text-gold italic font-serif">mensaje</span>
                </h2>
                <p className="text-white/50 font-light">
                  Un especialista se pondrá en contacto en menos de 24 horas.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                    <Check className="text-gold" size={32} />
                  </div>
                  <h3 className="text-2xl font-light mb-4">Mensaje Enviado</h3>
                  <p className="text-white/60 mb-8">
                    Gracias por contactarnos. Nuestro equipo se pondrá en contacto 
                    en breve para atender su consulta.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-gold hover:text-white text-sm font-medium tracking-wider transition-colors"
                  >
                    ENVIAR OTRO MENSAJE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white/70 text-sm font-light mb-3 tracking-wider">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-gold focus:outline-none transition-colors text-white placeholder-white/30"
                        placeholder="Su nombre"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm font-light mb-3 tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-gold focus:outline-none transition-colors text-white placeholder-white/30"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm font-light mb-3 tracking-wider">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-gold focus:outline-none transition-colors text-white placeholder-white/30"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm font-light mb-3 tracking-wider">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-gold focus:outline-none transition-colors text-white placeholder-white/30 resize-none"
                      placeholder="Por favor, cuéntenos cómo podemos ayudarle..."
                    />
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                    <button
                      type="submit"
                      className="group w-full md:w-auto px-12 py-5 border-2 border-white text-white bg-transparent rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 mx-auto"
                    >
                      Enviar Mensaje
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                    </button>
                    <p className="text-white/30 text-xs text-center mt-4">
                      Al enviar, acepta nuestra política de privacidad. No compartiremos su información.
                    </p>
                  </div>
                </form>
              )}
            </div>
            
            {/* Right Column - Info (Minimalista) */}
            <div className="info-section">
              <div className="sticky top-24 space-y-12">
                
                {/* Teléfono */}
                <div className="info-card group">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="text-gold/60 group-hover:text-gold transition-colors" size={18} />
                    <span className="text-white/40 text-xs uppercase tracking-widest">Teléfono</span>
                  </div>
                  <a 
                    href="tel:+15551234567"
                    className="text-xl font-light text-white/90 hover:text-gold transition-colors block"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>

                {/* Divisor sutil */}
                <div className="h-px bg-white/5" />
                
                {/* Email */}
                <div className="info-card group">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="text-gold/60 group-hover:text-gold transition-colors" size={18} />
                    <span className="text-white/40 text-xs uppercase tracking-widest">Email</span>
                  </div>
                  <a 
                    href="mailto:contacto@handoff.com.ar"
                    className="text-lg font-light text-white/90 hover:text-gold transition-colors block"
                  >
                    contacto@handoff.com.ar
                  </a>
                </div>

                {/* Divisor sutil */}
                <div className="h-px bg-white/5" />
                
                {/* Dirección */}
                <div className="info-card group">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-gold/60 group-hover:text-gold transition-colors" size={18} />
                    <span className="text-white/40 text-xs uppercase tracking-widest">Dirección</span>
                  </div>
                  <div className="text-white/70 text-sm font-light leading-relaxed">
                    Av. del Libertador 2442<br />
                    Palermo, Buenos Aires
                  </div>
                </div>

                {/* Divisor sutil */}
                <div className="h-px bg-white/5" />
                
                {/* Horarios */}
                <div className="info-card group">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-gold/60 group-hover:text-gold transition-colors" size={18} />
                    <span className="text-white/40 text-xs uppercase tracking-widest">Horarios</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50 font-light">Lun - Vie</span>
                      <span className="text-white/80 font-light">9:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50 font-light">Sábados</span>
                      <span className="text-white/80 font-light">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50 font-light">Domingos</span>
                      <span className="text-white/80 font-light">Por cita</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
