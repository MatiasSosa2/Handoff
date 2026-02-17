/**
 * Image Preloader for Critical Above-the-Fold Images
 * Preloads images with priority to reduce LCP
 */

export const preloadImage = (src: string, priority: 'high' | 'low' = 'high'): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set fetchpriority for modern browsers
    if ('fetchPriority' in img) {
      (img as any).fetchPriority = priority;
    }
    
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images in parallel
 */
export const preloadImages = (urls: string[], priority: 'high' | 'low' = 'high'): Promise<void[]> => {
  return Promise.all(urls.map(url => preloadImage(url, priority)));
};

/**
 * Lazy load images when they enter viewport
 */
export const lazyLoadImage = (img: HTMLImageElement): void => {
  const src = img.dataset.src;
  if (!src) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = image.dataset.src || '';
          image.classList.add('loaded');
          obs.unobserve(image);
        }
      });
    },
    {
      rootMargin: '50px', // Start loading 50px before entering viewport
    }
  );

  observer.observe(img);
};

/**
 * Preload critical resources on page load
 */
export const preloadCriticalAssets = (): void => {
  // Preload hero images for fastest LCP
  const criticalImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
  ];

  preloadImages(criticalImages, 'high').catch(console.error);
};
