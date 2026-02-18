import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Handoff-Inmobiliaria/' : '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    // PWA Configuration for offline support and caching
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'vite.svg'],
      manifest: {
        name: 'HANDOFF - Inversiones Inmobiliarias',
        short_name: 'HANDOFF',
        description: 'Gestión de activos inmobiliarios de alto patrimonio',
        theme_color: '#262626',
        background_color: '#FAF8F3',
        display: 'standalone',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        // Cache strategy
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      },
    }),
    // Compress assets with gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Compress assets with brotli (better compression)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Bundle analyzer (only in build mode for analysis)
    ...(process.env.ANALYZE ? [visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })] : []),
  ],
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core React libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            // Animation libraries
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animation-vendor';
            }
            // UI Icons
            if (id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // 3D libraries
            if (id.includes('three') || id.includes('@react-three')) {
              return '3d-vendor';
            }
            // Map libraries
            if (id.includes('leaflet') || id.includes('mapbox')) {
              return 'map-vendor';
            }
            // Groq SDK
            if (id.includes('groq-sdk')) {
              return 'groq-vendor';
            }
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext ?? '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    // Chunk size warning
    chunkSizeWarningLimit: 800,
    // Aggressive minification with esbuild
    minify: 'esbuild',
    // Enable CSS code splitting for faster loading
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'esnext',
    // No sourcemaps in production
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Pre-bundle heavy dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'gsap', 
      '@gsap/react', 
      'lenis',
      'lucide-react',
    ],
    // Force exclude development-only deps
    exclude: ['@vite/client', '@vite/env'],
  },
  server: {
    // Faster HMR
    hmr: {
      overlay: false,
    },
    // Force pre-transform
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/main.tsx',
        './src/pages/Home.tsx',
      ],
    },
  },
  // Enable experimental features
  experimental: {
    renderBuiltUrl(filename) {
      // Use CDN in production if needed
      return filename;
    },
  },
})
