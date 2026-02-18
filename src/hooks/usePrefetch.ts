import { useEffect } from 'react';

/**
 * Hook para prefetch inteligente de rutas basado en interacción del usuario
 * Carga componentes cuando el usuario hace hover sobre links
 */
export const usePrefetch = () => {
  useEffect(() => {
    const prefetchMap = new Map<string, () => Promise<any>>();
    
    // Mapear rutas a sus imports dinámicos
    prefetchMap.set('/inversion', () => import('../pages/Investment'));
    prefetchMap.set('/propiedades', () => import('../pages/Properties'));
    prefetchMap.set('/lifestyle', () => import('../pages/Lifestyle'));
    prefetchMap.set('/contacto', () => import('../pages/Contact'));
    
    // Prefetch basado en hover
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          const pathname = url.pathname.replace(/\/$/, ''); // Remove trailing slash
          const prefetchFn = prefetchMap.get(pathname);
          
          if (prefetchFn) {
            // Prefetch cuando el usuario hace hover
            prefetchFn().catch(() => {
              // Silently fail - el componente se cargará normalmente al navegar
            });
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    };
    
    // Detectar la probabilidad de navegación por toque en móviles
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          const pathname = url.pathname.replace(/\/$/, '');
          const prefetchFn = prefetchMap.get(pathname);
          
          if (prefetchFn && !sessionStorage.getItem(`prefetched_${pathname}`)) {
            // Marcar como prefetched para evitar recargas
            sessionStorage.setItem(`prefetched_${pathname}`, 'true');
            prefetchFn();
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    };
    
    // Prefetch automático de rutas importantes después de que se cargue la página
    const prefetchImportantRoutes = () => {
      // Esperar 2 segundos después de que la página esté idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Prefetch de las rutas más visitadas
          import('../pages/Properties').catch(() => {});
          import('../pages/Investment').catch(() => {});
        }, { timeout: 3000 });
      } else {
        // Fallback para navegadores sin requestIdleCallback
        setTimeout(() => {
          import('../pages/Properties').catch(() => {});
          import('../pages/Investment').catch(() => {});
        }, 2000);
      }
    };
    
    // Añadir listeners
    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    // Prefetch después de la carga inicial
    if (document.readyState === 'complete') {
      prefetchImportantRoutes();
    } else {
      window.addEventListener('load', prefetchImportantRoutes);
    }
    
    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('load', prefetchImportantRoutes);
    };
  }, []);
};
