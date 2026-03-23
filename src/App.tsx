import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from './components/PageTransition';
import SiteLayout from './layouts/SiteLayout';
import { preloadCriticalAssets } from './utils/imagePreloader';
import { usePrefetch } from './hooks/usePrefetch';

// Lazy load pages for optimal performance
const Home = lazy(() => import('./pages/Home'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Investment = lazy(() => import('./pages/Investment'));
const Properties = lazy(() => import('./pages/Properties'));
const Lifestyle = lazy(() => import('./pages/Lifestyle'));
const Contact = lazy(() => import('./pages/Contact'));

gsap.registerPlugin(ScrollTrigger);

// Loading component optimizado
const PageLoader = () => (
  <div className="min-h-screen bg-parchment flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin" 
         style={{ willChange: 'transform' }} />
  </div>
);

function App() {
  // Prefetch inteligente de rutas
  usePrefetch();

  useEffect(() => {
    // Performance mark
    if (window.performance && typeof window.performance.mark === 'function') {
      performance.mark('app_mounted');
    }

    // Preload critical images immediately
    preloadCriticalAssets();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
            <Route path="/" element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            <Route path="/inversion" element={
              <PageTransition>
                <Investment />
              </PageTransition>
            } />
            <Route path="/propiedades" element={
              <PageTransition>
                <Properties />
              </PageTransition>
            } />
            <Route path="/propiedad/:id" element={
              <PageTransition>
                <PropertyDetail />
              </PageTransition>
            } />
            <Route path="/lifestyle" element={
              <PageTransition>
                <Lifestyle />
              </PageTransition>
            } />
            <Route path="/contacto" element={
              <PageTransition>
                <Contact />
              </PageTransition>
            } />
          </Route>
        </Routes>
      </Suspense>
  );
}

export default App;
