import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Handoff/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'ui-vendor': ['lucide-react'],
          'lenis-vendor': ['lenis'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Smaller chunks for better caching
    target: 'esnext',
    // Sourcemaps only for production debugging
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', '@gsap/react', 'lenis'],
  },
  server: {
    // Faster HMR
    hmr: {
      overlay: false,
    },
  },
})
