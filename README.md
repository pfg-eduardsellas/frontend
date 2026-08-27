# Frontend — PFG

Interfície web feta amb React 19 i Vite per gestionar escanejos del bot: llançar-los, veure el graf d'accions (React Flow), consultar violacions d'accessibilitat i programar test paths.

Tecnologies principals: Redux Toolkit amb RTK Query, styled-components, Tailwind CSS 4, @xyflow/react (graf) i dagre (layout).

## Requisits

- Node.js 20+ i npm
- El backend en marxa a `http://127.0.0.1:8000` (el servidor de desenvolupament fa proxy de `/api` cap allà, vegeu `vite.config.js`)

## Posada en marxa

```bash
npm install
npm run dev
```

L'aplicació queda disponible a `http://localhost:5173`.

### Variables d'entorn

Opcionalment, crea un fitxer `.env` a l'arrel del repositori:

```env
VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
```

Només cal per habilitar el botó de login amb Google; sense aquesta variable el login amb usuari i contrasenya funciona igualment.

## Scripts disponibles

| Comanda | Descripció |
|---|---|
| `npm run dev` | Servidor de desenvolupament amb hot reload |
| `npm run build` | Build de producció a `dist/` |
| `npm run preview` | Serveix el build de producció en local |
| `npm run lint` | Passa ESLint |

## Estructura

```
src/
├── api.jsx              # Definició de tots els endpoints (RTK Query)
├── store.js             # Store de Redux
├── components/          # Components reutilitzables (botons, modals, taules, graf...)
│   └── graph/graphViewer/   # Visualització del graf d'accions
└── containers/          # Pàgines: login, homePage (dashboard) i testPathsPage
```
