export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceValue: number;
  description: string;
  longDescription: string;
  features: string[];
  amenities: string[];
  specs: {
    area: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  category: 'City' | 'Nature' | 'Coast';
  status: 'Available' | 'Off-Market' | 'Sold';
  images: string[];
  coordinates: { lat: number; lng: number };
  highlights: string[];
}

export const properties: Property[] = [
  {
    id: 'residencia-velamar',
    title: 'Residencia Velamar',
    location: 'Puerto Madero, Buenos Aires',
    price: 'USD 4.2M',
    priceValue: 4200000,
    description: 'Una obra maestra de cristal y acero que redefine el lujo urbano contemporáneo.',
    longDescription: 'Esta unidad de doble altura ofrece vistas de 360 grados al río, con acabados en mármol de Carrara importado y un sistema de automatización integral. El diseño arquitectónico fusiona minimalismo japonés con tecnología de vanguardia, creando espacios que respiran sofisticación. Cada detalle ha sido cuidadosamente curado para ofrecer una experiencia residencial sin precedentes en Buenos Aires.',
    features: ['840 m² Totales', '4 Suites', 'Cava Privada', 'Helipuerto'],
    amenities: ['Piscina Infinita', 'Smart Home', 'Seguridad 24/7', 'Gimnasio Privado', 'Cava Climatizada', 'Terraza Panorámica'],
    specs: {
      area: '840 m²',
      bedrooms: 4,
      bathrooms: 5,
      parking: 3,
    },
    category: 'City',
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
    ],
    coordinates: { lat: -34.6131, lng: -58.3772 },
    highlights: ['Diseño de Estudio Arquitectónico Internacional', 'Materiales Importados de Europa', 'Sistema Domótico Completo'],
  },
  {
    id: 'vanguard-estate',
    title: 'Vanguard Estate',
    location: 'Nordelta, Tigre',
    price: 'USD 2.8M',
    priceValue: 2800000,
    description: 'Diseño biofílico que integra la naturaleza en cada habitación.',
    longDescription: 'La estructura se despliega orgánicamente alrededor de un patio central de especies nativas. Arquitectura sustentable certificada LEED Gold, con paneles solares integrados y sistemas de recolección de agua de lluvia. Los espacios interiores se funden con el exterior mediante ventanales de piso a techo que enmarcan vistas al campo de golf y la laguna.',
    features: ['1,200 m² Lote', 'Diseño Sustentable', 'Piscina Olímpica', 'Home Cinema'],
    amenities: ['Piscina Climatizada', 'Quincho Premium', 'Golf Course View', 'Seguridad 24/7', 'Paneles Solares', 'Sistema de Riego Inteligente'],
    specs: {
      area: '680 m² cubiertos',
      bedrooms: 5,
      bathrooms: 4,
      parking: 4,
    },
    category: 'Nature',
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1920&q=80',
    ],
    coordinates: { lat: -34.4113, lng: -58.6444 },
    highlights: ['Certificación LEED Gold', 'Arquitectura Biofílica', 'Frente al Golf'],
  },
  {
    id: 'penthouse-recoleta',
    title: 'Penthouse Recoleta Heritage',
    location: 'Recoleta, Buenos Aires',
    price: 'USD 3.5M',
    priceValue: 3500000,
    description: 'Edificio histórico restaurado con diseño contemporáneo de vanguardia.',
    longDescription: 'Ubicado en un edificio emblemático de 1920 completamente restaurado. El penthouse combina molduras originales francesas con intervenciones contemporáneas audaces. Techos de 4.5 metros de altura, pisos de roble europeo y una terraza de 180 m² con vistas a la Basílica y el cementerio histórico. Una obra de arte habitable en el corazón cultural de Buenos Aires.',
    features: ['520 m² + 180 m² terraza', '3 Suites', 'Biblioteca Privada', 'Roof Garden'],
    amenities: ['Terraza con Jacuzzi', 'Biblioteca de Roble', 'Cocina Bulthaup', 'Seguridad Discreta', 'Ascensor Privado', 'Bodega Premium'],
    specs: {
      area: '520 m² + 180 m² terraza',
      bedrooms: 3,
      bathrooms: 4,
      parking: 2,
    },
    category: 'City',
    status: 'Off-Market',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c82bbc84d?w=1920&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80',
    ],
    coordinates: { lat: -34.5875, lng: -58.3927 },
    highlights: ['Edificio Histórico Restaurado', 'Molduras Francesas Originales', 'Ubicación Privilegiada'],
  },
  {
    id: 'casa-pilar-country',
    title: 'Casa Pilar Modern Oasis',
    location: 'Pilar Country Club',
    price: 'USD 1.8M',
    priceValue: 1800000,
    description: 'Arquitectura moderna en entorno natural premium.',
    longDescription: 'Casa diseñada por estudio de arquitectos reconocidos, con enfoque en la integración interior-exterior. Grandes ventanales, materiales nobles como hormigón a la vista, madera y acero. Piscina con sistema de natación contracorriente, jardín diseñado por paisajista y sistema de iluminación LED programable. Ideal para familias que buscan calidad de vida sin renunciar al diseño.',
    features: ['450 m² cubiertos', 'Piscina 15m', 'SUM + Parrilla', 'Seguridad Country'],
    amenities: ['Piscina Climatizada', 'Quincho Gourmet', 'Seguridad 24/7', 'Golf & Polo Access', 'Gimnasio', 'Home Office'],
    specs: {
      area: '450 m² + 800 m² lote',
      bedrooms: 4,
      bathrooms: 3,
      parking: 3,
    },
    category: 'Nature',
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1920&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1920&q=80',
    ],
    coordinates: { lat: -34.4584, lng: -58.9014 },
    highlights: ['Estudio de Arquitectos Reconocido', 'Sistema Smart Home', 'Jardín por Paisajista'],
  },
  {
    id: 'departamento-belgrano',
    title: 'Departamento Belgrano Loft',
    location: 'Belgrano, Buenos Aires',
    price: 'USD 620K',
    priceValue: 620000,
    description: 'Loft contemporáneo en edificio boutique de máxima categoría.',
    longDescription: 'Unidad de 2 ambientes amplios en edificio nuevo con amenities premium. Diseño abierto tipo loft con cocina integrada, balcón con parrilla y vista arbolada. Edificio con gimnasio, piscina en rooftop, coworking y bauleras. Zona residencial de alta demanda con colegios, transportes y gastronomía a pasos.',
    features: ['95 m² totales', '2 Ambientes', 'Balcón Terraza', 'Cochera Doble'],
    amenities: ['Rooftop con Piscina', 'Gimnasio Equipado', 'Coworking', 'Seguridad 24/7', 'Bauleras', 'Bike Parking'],
    specs: {
      area: '95 m²',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
    },
    category: 'City',
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c82bbc84d?w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    ],
    coordinates: { lat: -34.5627, lng: -58.4565 },
    highlights: ['Edificio Boutique Nuevo', 'Zona Premium Belgrano', 'Amenities Completos'],
  },
];
