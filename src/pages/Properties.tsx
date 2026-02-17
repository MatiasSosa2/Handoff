import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { properties } from '../data/properties';
import { MapPin, Home, X, SlidersHorizontal } from 'lucide-react';
import MarketTicker from '../components/MarketTicker';
import BlueprintWalkthrough from '../components/BlueprintWalkthrough';
import ContextSurroundings from '../components/ContextSurroundings';
import MaterialityShowcase from '../components/MaterialityShowcase';

const Properties = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'TODAS', bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' },
    { id: 'City', label: 'RESIDENCIAL', bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80' },
    { id: 'Coast', label: 'COASTAL', bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80' },
    { id: 'Nature', label: 'EXCLUSIVO', bg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' },
  ];

  const filteredProperties = properties.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="bg-charcoal">
      {/* Hero: Categorías Interactivas */}
      <section className="relative h-screen overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                gsap.to(img, { scale: 1.1, duration: 0.6 });
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                gsap.to(img, { scale: 1, duration: 0.6 });
              }}
              className={`relative group overflow-hidden cursor-pointer ${
                activeCategory === cat.id ? 'ring-4 ring-gold' : ''
              }`}
            >
              <img
                src={cat.bg}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-charcoal/60 group-hover:bg-charcoal/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,0,0,1)] text-center">
                  {cat.label}
                </h2>
              </div>
            </button>
          ))}
        </div>

        {/* Floating Filter Button */}
        <button
          onClick={() => setShowFilters(true)}
          className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl"
        >
          <SlidersHorizontal size={24} className="text-charcoal" />
        </button>
      </section>

      {/* Market Momentum Mini */}
      <MarketTicker />

      {/* Properties Grid Primario - Standard Vertical Layout */}
      <section className="bg-charcoal py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <Link
                key={property.id}
                to={`/propiedad/${property.id}`}
                className="cursor-hover property-card group relative overflow-hidden h-[500px]"
              >
                {/* Image */}
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                {/* Massive Typography Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 w-full text-center overflow-hidden">
                  <h3 className="text-[100px] font-black text-parchment tracking-tighter leading-none">
                    {property.location.split(',')[0]}
                  </h3>
                </div>

                {/* Content */}
                <div className="card-content absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center text-white text-sm mb-2 drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-semibold">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2 drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] tracking-tight line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center text-white text-sm drop-shadow-[0_0_10px_rgba(0,0,0,1)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-semibold">
                      <Home size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{property.specs.bedrooms} dorm • {property.specs.bathrooms} baños</span>
                    </div>
                    <div className="text-gold font-extrabold text-lg lg:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] whitespace-nowrap">
                      {property.price}
                    </div>
                  </div>
                </div>

                {/* Index Number */}
                <div className="absolute top-4 right-4 text-white/20 text-6xl font-black">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Blueprint Walkthrough - Anatomía del Espacio */}
      <BlueprintWalkthrough />

      {/* Context & Surroundings - El Barrio como Amenity */}
      <ContextSurroundings />

      {/* Interactive Materiality */}
      <MaterialityShowcase />

      {/* CTA Private Circle */}
      <section className="py-32 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #9ca3af 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-6 py-2 border border-gray-400 text-gray-800 tracking-[0.3em] text-xs uppercase font-bold mb-8 backdrop-blur-sm bg-white/70">
            Acceso Exclusivo
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Propiedades <span className="text-gray-700 italic font-serif">Off-Market</span>
          </h2>
          <p className="text-gray-700 text-lg mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Accede a un portfolio selecto de propiedades que nunca llegan al mercado público. Para inversores que valoran la discreción.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-5 bg-neutral-900 text-white font-bold tracking-wider hover:bg-neutral-800 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            SOLICITAR ACCESO
          </Link>
        </div>
      </section>

      {/* Filter Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-lg">
          <div className="max-w-2xl w-full p-12">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-4xl font-light text-white">Filtrar</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-white/50 text-sm mb-4 uppercase tracking-widest">Categoría</p>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setShowFilters(false);
                      }}
                      className={`py-6 text-lg font-semibold transition-all duration-300 ${
                        activeCategory === cat.id
                          ? 'bg-gold text-charcoal'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
