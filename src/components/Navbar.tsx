import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// Removed MarketMomentumClock per request

const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Detect if scrolled past typical hero height (600-700px)
      const scrollPosition = window.scrollY;
      setIsScrolledPastHero(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    gsap.from('.nav-logo', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.nav-link', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
    });

    // Animación del menú móvil - Bottom Sheet
    if (isMobileMenuOpen) {
      gsap.fromTo('.mobile-menu-sheet',
        { y: '100%' },
        { y: '0%', duration: 0.4, ease: 'power3.out' }
      );
      
      gsap.fromTo('.mobile-menu-link',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.15 }
      );
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Inversión', href: '/inversion' },
    { name: 'Propiedades', href: '/propiedades' },
    { name: 'Lifestyle', href: '/lifestyle' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-500 ${
      isScrolledPastHero ? 'bg-white' : 'bg-parchment/95'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="nav-logo flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-olive hover:text-gold transition-colors duration-300"
            >
              HANDOFF
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`nav-link text-sm font-medium transition-colors duration-300 tracking-wide ${
                  location.pathname === link.href
                    ? 'text-gold'
                    : 'text-charcoal hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Removed "Agendar Visita" CTA from navbar */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-olive hover:text-gold transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Bottom Sheet */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop oscuro */}
            <div 
              className="md:hidden fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Bottom Sheet Panel */}
            <div className="mobile-menu-sheet md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] max-h-[85vh] overflow-y-auto">
              {/* Drag Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-charcoal/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-2 pb-4">
                <h2 className="text-lg font-bold text-charcoal tracking-tight">Menú</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col px-6 pb-8">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`mobile-menu-link text-xl font-medium py-4 border-b border-charcoal/5 transition-colors duration-300 ${
                      location.pathname === link.href
                        ? 'text-gold'
                        : 'text-charcoal hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-6 pb-8 pt-4">
                <p className="text-charcoal/30 text-xs uppercase tracking-widest text-center">
                  Premium Real Estate
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
