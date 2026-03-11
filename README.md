# React + TypeScript + Vite

## Turnos con MySQL local

La página [src/pages/Contact.tsx](src/pages/Contact.tsx) ahora queda pensada como sistema de turnos. El frontend consume una API local en [server/index.js](server/index.js), y esa API persiste los registros en MySQL usando la configuración del archivo [.env.local](.env.local).

### Inicio local

1. Asegurá que MySQL esté corriendo en localhost:3306.
2. Revisá las variables MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD y MYSQL_DATABASE en [.env.local](.env.local).
3. Ejecutá npm run dev para levantar frontend y API al mismo tiempo.

La tabla se crea automáticamente al iniciar la API. Si querés crearla manualmente, tenés el script en [database/schema.sql](database/schema.sql).

## Deploy en Vercel

El frontend se puede desplegar directamente desde GitHub en Vercel. Para que los turnos funcionen en producción, Vercel debe tener configuradas variables de entorno reales para MySQL y no valores locales.

Variables mínimas en Vercel:

1. MYSQL_HOST
2. MYSQL_PORT
3. MYSQL_USER
4. MYSQL_PASSWORD
5. MYSQL_DATABASE
6. VITE_GROQ_API_KEY si seguís usando el chatbot actual en cliente

Importante: no uses 127.0.0.1 ni root/local password en Vercel. Necesitás una base MySQL accesible desde internet, por ejemplo Railway, Aiven, PlanetScale o similar.

Las rutas /api en producción quedan servidas por funciones serverless dentro de [api/health.js](api/health.js), [api/appointments/index.js](api/appointments/index.js) y [api/appointments/[id]/status.js](api/appointments/[id]/status.js).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
