import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  fetchPriority = priority ? 'high' : 'auto'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!priority) {
      // Lazy load non-priority images with Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.disconnect();
            }
          });
        },
        { 
          rootMargin: '100px', // Start loading earlier for smoother experience
          threshold: 0.01
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    } else {
      // Priority images load immediately
      setImageSrc(src);
    }
  }, [src, priority]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-taupe/5 via-taupe/10 to-taupe/5 animate-pulse" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={fetchPriority}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          style={{
            willChange: isLoaded ? 'auto' : 'transform',
            transform: 'translateZ(0)',
            contentVisibility: 'auto',
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
