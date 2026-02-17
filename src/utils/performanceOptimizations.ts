/**
 * Performance optimizations utilities for HANDOFF
 */

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for frequent events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload image utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (sources: string[]): Promise<void> => {
  await Promise.all(sources.map(src => preloadImage(src)));
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// GSAP performance defaults
export const gsapDefaults = {
  ease: 'power2.out',
  duration: 0.6,
  force3D: true, // Force GPU acceleration
  willChange: 'transform', // Hint to browser
};

// Optimize ScrollTrigger for performance
export const optimizedScrollTriggerConfig = {
  start: 'top 80%',
  once: true, // Only trigger once
  toggleActions: 'play none none none',
  fastScrollEnd: true,
  preventOverlaps: true,
};
