import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  MapPin,
  Download,
  Calendar,
  X,
} from 'lucide-react';
import { properties } from '../data/properties';

gsap.registerPlugin(ScrollTrigger);

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-olive mb-4">
            Propiedad no encontrada
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-olive text-parchment hover:bg-gold transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  useGSAP(() => {
    gsap.fromTo('.hero-image',
      { scale: 1.2 },
      {
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      }
    );

    gsap.fromTo('.hero-title',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        delay: 0.3,
      }
    );

    gsap.fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      }
    );

    gsap.fromTo('.quick-spec',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.specs-bar',
          start: 'top 80%',
          once: true,
        },
      }
    );

    gsap.fromTo('.amenity-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.amenities-section',
          start: 'top 70%',
          once: true,
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitud de visita:', formData);
    alert('¡Solicitud enviada! Un asesor se contactará en breve.');
    setFormData({ name: '', email: '', phone: '', date: '', message: '' });
  };

  const openGallery = (index: number) => {
    setCurrentImage(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden mt-20">
        <div className="hero-image absolute inset-0">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-10 flex items-center space-x-2 text-parchment hover:text-gold transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="relative h-full flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="hero-title">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-4 py-1 bg-gold/90 text-white text-xs font-semibold tracking-wider">
                  {property.status}
                </span>
                <span className="px-4 py-1 bg-olive/80 text-white text-xs font-semibold tracking-wider">
                  {property.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {property.title}
              </h1>
            </div>
            <div className="hero-subtitle flex items-center justify-between">
              <div className="flex items-center text-white/90">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>
              <div className="text-4xl font-bold text-white">{property.price}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs Bar */}
      <section className="specs-bar py-8 bg-white border-b border-taupe/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="quick-spec flex items-center space-x-3">
              <Maximize2 size={24} className="text-gold" />
              <div>
                <p className="text-xs text-taupe uppercase tracking-wide">Área</p>
                <p className="text-xl font-semibold text-charcoal">
                  {property.specs.area}
                </p>
              </div>
            </div>
            <div className="quick-spec flex items-center space-x-3">
              <BedDouble size={24} className="text-gold" />
              <div>
                <p className="text-xs text-taupe uppercase tracking-wide">
                  Dormitorios
                </p>
                <p className="text-xl font-semibold text-charcoal">
                  {property.specs.bedrooms}
                </p>
              </div>
            </div>
            <div className="quick-spec flex items-center space-x-3">
              <Bath size={24} className="text-gold" />
              <div>
                <p className="text-xs text-taupe uppercase tracking-wide">Baños</p>
                <p className="text-xl font-semibold text-charcoal">
                  {property.specs.bathrooms}
                </p>
              </div>
            </div>
            <div className="quick-spec flex items-center space-x-3">
              <Car size={24} className="text-gold" />
              <div>
                <p className="text-xs text-taupe uppercase tracking-wide">Cocheras</p>
                <p className="text-xl font-semibold text-charcoal">
                  {property.specs.parking}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-olive mb-6">
                Concepto Arquitectónico
              </h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
                {property.longDescription}
              </p>
              <div className="space-y-3">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gold mr-3">✦</span>
                    <span className="text-charcoal">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8">
              <h3 className="text-2xl font-semibold text-olive mb-6">
                Especificaciones Técnicas
              </h3>
              <div className="space-y-4">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-taupe/20"
                  >
                    <span className="text-taupe">Característica</span>
                    <span className="font-medium text-charcoal">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-taupe/20">
                <button className="w-full flex items-center justify-center space-x-2 py-4 bg-olive text-parchment hover:bg-gold transition-colors">
                  <Download size={20} />
                  <span>Descargar Dossier Completo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-olive mb-12 text-center">
            Galería de Exploración
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <div
                key={index}
                onClick={() => openGallery(index)}
                className={`relative overflow-hidden cursor-pointer group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-olive/0 group-hover:bg-olive/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="amenities-section py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-olive mb-12 text-center">
            Amenidades Premium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="amenity-card text-center p-6 bg-white hover:bg-olive group transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center transition-colors duration-500">
                  <span className="text-2xl text-gold">✦</span>
                </div>
                <p className="text-charcoal group-hover:text-parchment transition-colors duration-500 font-medium">
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Showing Form */}
      <section className="py-24 bg-olive">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-parchment mb-4">
              Agende una Visita Privada
            </h2>
            <p className="text-parchment/80 text-lg">
              Un asesor senior lo acompañará personalmente en un recorrido exclusivo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="px-4 py-4 bg-white/10 border border-parchment/20 focus:border-gold focus:outline-none text-parchment placeholder:text-parchment/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="px-4 py-4 bg-white/10 border border-parchment/20 focus:border-gold focus:outline-none text-parchment placeholder:text-parchment/50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="px-4 py-4 bg-white/10 border border-parchment/20 focus:border-gold focus:outline-none text-parchment placeholder:text-parchment/50"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="px-4 py-4 bg-white/10 border border-parchment/20 focus:border-gold focus:outline-none text-parchment placeholder:text-parchment/50"
              />
            </div>

            <textarea
              placeholder="Mensaje adicional (opcional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-4 bg-white/10 border border-parchment/20 focus:border-gold focus:outline-none text-parchment placeholder:text-parchment/50"
            />

            <button
              type="submit"
              className="w-full py-5 bg-gold text-charcoal font-semibold tracking-wider hover:bg-parchment transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Calendar size={20} />
              <span>SOLICITAR VISITA</span>
            </button>
          </form>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[10001] bg-charcoal/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-8 right-8 text-parchment hover:text-gold transition-colors"
          >
            <X size={32} />
          </button>

          <img
            src={property.images[currentImage]}
            alt={`${property.title} ${currentImage + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage ? 'bg-gold w-8' : 'bg-parchment/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
