import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const routeNames: Record<string, string> = {
    '/': 'INICIO',
    '/inversion': 'INVERSIÓN',
    '/propiedades': 'PROPIEDADES',
    '/lifestyle': 'LIFESTYLE',
    '/contacto': 'CONTACTO',
  };

  // Si estamos en home, no mostrar breadcrumbs
  if (location.pathname === '/') return null;

  const currentRoute = routeNames[location.pathname] || 'PÁGINA';

  return (
    <div className="fixed top-24 left-6 lg:left-8 z-40 flex items-center gap-2 text-[9px] tracking-[0.25em] font-medium text-taupe/60 uppercase">
      <Link 
        to="/" 
        className="hover:text-gold transition-colors duration-300"
      >
        HANDOFF
      </Link>
      <ChevronRight size={10} strokeWidth={2} className="opacity-40" />
      <span className="text-olive">{currentRoute}</span>
    </div>
  );
};

export default Breadcrumbs;
