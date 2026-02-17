import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Coffee, Utensils, GraduationCap, Palette, Ship, ShoppingBag } from 'lucide-react';

// Corregir el bug de iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Icono dorado personalizado para la propiedad principal
const goldIcon = new L.DivIcon({
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background: #C2A37E;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(194, 163, 126, 0.8), 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
    </div>
  `,
  className: 'custom-gold-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Función para crear iconos de amenities
const createAmenityIcon = (color = '#C2A37E') => {
  return new L.DivIcon({
    html: `
      <div style="
        width: 35px;
        height: 35px;
        background: white;
        border: 2px solid ${color};
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      ">
        <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%;"></div>
      </div>
    `,
    className: 'custom-amenity-marker',
    iconSize: [35, 35],
    iconAnchor: [17, 17],
  });
};

const ContextSurroundings = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<number | null>(null);
  const position: [number, number] = [-34.6037, -58.3816]; // Buenos Aires - Ajustar según ubicación real

  const amenities = [
    {
      id: 1,
      name: 'Galerías de Arte',
      distance: '350m',
      icon: Palette,
      position: [-34.6017, -58.3836] as [number, number],
      description: '3 galerías contemporáneas',
      category: 'cultura'
    },
    {
      id: 2,
      name: 'Restaurantes Premium',
      distance: '200m',
      icon: Utensils,
      position: [-34.6027, -58.3796] as [number, number],
      description: '2 estrellas Michelin',
      category: 'gastronomia'
    },
    {
      id: 3,
      name: 'Colegio Internacional',
      distance: '450m',
      icon: GraduationCap,
      position: [-34.6057, -58.3776] as [number, number],
      description: 'IB Programme',
      category: 'educacion'
    },
    {
      id: 4,
      name: 'Club Náutico',
      distance: '800m',
      icon: Ship,
      position: [-34.6077, -58.3856] as [number, number],
      description: 'Amarras disponibles',
      category: 'deportes'
    },
    {
      id: 5,
      name: 'Café de Especialidad',
      distance: '150m',
      icon: Coffee,
      position: [-34.6037, -58.3806] as [number, number],
      description: 'Barista campeón',
      category: 'lifestyle'
    },
    {
      id: 6,
      name: 'Boutiques de Diseño',
      distance: '300m',
      icon: ShoppingBag,
      position: [-34.6047, -58.3766] as [number, number],
      description: 'Marcas exclusivas',
      category: 'shopping'
    },
  ];

  return (
    <section className="py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Info lateral */}
          <div className="space-y-6">
            <span className="inline-block px-6 py-2 border border-gold/40 text-charcoal tracking-[0.3em] text-xs uppercase font-bold mb-4 bg-white/80">
              Contexto & Entorno
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal italic leading-tight">
              Ubicación <br/>Estratégica
            </h2>
            <p className="text-charcoal/80 font-light leading-relaxed text-sm">
              Situado en el nexo de la cultura y el diseño, nuestro desarrollo 
              se integra orgánicamente en la trama urbana más exclusiva.
            </p>

            {/* Lista de amenities */}
            <div className="space-y-3 pt-6">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = selectedAmenity === amenity.id;
                return (
                  <div 
                    key={amenity.id}
                    className={`flex items-center gap-3 p-3 rounded border transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-white border-gold/40' 
                          : 'bg-white border-gold/20 hover:border-gold/40'
                      }`}
                    onMouseEnter={() => setSelectedAmenity(amenity.id)}
                    onMouseLeave={() => setSelectedAmenity(null)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-gold' : 'bg-white'
                      }`}>
                        <Icon size={16} className={isSelected ? 'text-charcoal' : 'text-gold'} />
                    </div>
                    <div className="flex-1">
                        <div className="text-charcoal text-sm font-semibold">{amenity.name}</div>
                        <div className="text-charcoal text-xs">{amenity.distance}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mapa Leaflet con Stadia Maps Dark */}
          <div className="lg:col-span-2 h-[600px] relative border-2 border-gold/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 grayscale-[0.2] contrast-[1.1] brightness-[0.85]">
              <MapContainer 
                center={position} 
                zoom={14} 
                scrollWheelZoom={true}
                zoomControl={true}
                className="h-full w-full"
                style={{ background: '#1a1a1a' }}
              >
                {/* Stadia Maps - Alidade Smooth Dark (Gratuito) */}
                <TileLayer
                  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                  maxZoom={20}
                />
                
                {/* Radio de cobertura (800m) */}
                <Circle
                  center={position}
                  radius={800}
                  pathOptions={{
                    color: '#C2A37E',
                    fillColor: '#C2A37E',
                    fillOpacity: 0.05,
                    weight: 2,
                    opacity: 0.3,
                    dashArray: '10, 10'
                  }}
                />

                {/* Marcador principal - La Propiedad */}
                <Marker position={position} icon={goldIcon}>
                  <Popup className="custom-popup">
                    <div className="text-center p-2">
                      <h3 className="font-bold text-gold text-lg mb-1">Tu Propiedad</h3>
                      <p className="text-xs text-gray-600">Ubicación estratégica premium</p>
                    </div>
                  </Popup>
                </Marker>

                {/* Marcadores de Amenities */}
                {amenities.map((amenity) => (
                  <Marker 
                    key={amenity.id}
                    position={amenity.position}
                    icon={createAmenityIcon(selectedAmenity === amenity.id ? '#C2A37E' : '#8B7355')}
                    eventHandlers={{
                      mouseover: () => setSelectedAmenity(amenity.id),
                      mouseout: () => setSelectedAmenity(null),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-gold mb-1">{amenity.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{amenity.description}</p>
                        <p className="text-xs font-bold text-gold">{amenity.distance}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            
            {/* Overlay sutil */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            
            {/* Watermark */}
            <div className="absolute bottom-4 left-4 bg-charcoal/90 backdrop-blur-sm px-4 py-2 text-white text-xs border border-gold/30 z-[1000]">
              <div className="font-bold text-gold">Radio: 800m</div>
              <div className="text-white/60">Mapa interactivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS para popups y marcadores */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .leaflet-popup-tip {
          background: white;
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .custom-gold-marker,
        .custom-amenity-marker {
          border: none !important;
          background: transparent !important;
        }
        .custom-amenity-marker:hover > div {
          transform: scale(1.15) !important;
        }
        .text-gold {
          color: #C2A37E;
        }
      `}</style>
    </section>
  );
};

export default ContextSurroundings;
