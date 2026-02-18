import { memo } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = memo(() => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Columna 1: Empresa */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Sobre Handoff
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Carreras
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Prensa
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/inversion" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Estrategia de Inversión
                </Link>
              </li>
              <li>
                <Link to="/propiedades" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  La Colección
                </Link>
              </li>
              <li>
                <Link to="/lifestyle" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Lifestyle & Expertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Sostenibilidad */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">
              Sostenibilidad
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Certificación LEED
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Diseño Biofílico
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-gold transition-colors duration-300 text-sm">
                  Compromiso Ambiental
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Prensa */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em]">
              Prensa
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-gold">★</span>
                <a 
                  href="https://forbes.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors duration-300 text-sm"
                >
                  Forbes Argentina
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">★</span>
                <a 
                  href="https://lanacion.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors duration-300 text-sm"
                >
                  La Nación
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">★</span>
                <a 
                  href="https://architecturaldigest.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-gold transition-colors duration-300 text-sm"
                >
                  Architectural Digest
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-gold flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-gold flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-xs">
              © 2026 Handoff. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="text-white/60 hover:text-gold transition-colors duration-300 text-xs">
                Privacidad
              </Link>
              <Link to="/" className="text-white/60 hover:text-gold transition-colors duration-300 text-xs">
                Términos
              </Link>
              <Link to="/" className="text-white/60 hover:text-gold transition-colors duration-300 text-xs">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
