# Spybee Challenge

Panel de gestión de incidencias de construcción con mapas interactivos, dashboard analítico y autenticación simulada.

## Stack tecnológico

| Capa          | Tecnología                                  |
| ------------- | ------------------------------------------- |
| Framework     | Next.js 16.2.9 (App Router)                |
| UI            | React 19.2.4, TypeScript 5                 |
| Mapas         | Mapbox GL JS 3.24.1                        |
| Gráficos      | Recharts 3.8.1                             |
| Estado        | Zustand 5.0.14                             |
| Estilos       | Sass (SCSS Modules)                        |
| Íconos        | Lucide React 1.20.0                        |
| Linter        | ESLint 9 con config de Next.js             |

## Estructura del proyecto

```
src/
├── app/                          # Páginas y layouts (App Router)
│   ├── layout.tsx                # Layout raíz (minimal, sin sidebar)
│   ├── page.tsx                  # Login (`/`)
│   ├── Login.module.scss
│   └── (dashboard)/              # Route group — rutas protegidas
│       ├── layout.tsx            # Layout con AppShell, Navbar, Sidebar
│       ├── dashboard/
│       │   ├── page.tsx          # Dashboard analítico (`/dashboard`)
│       │   └── Dashboard.module.scss
│       └── crear-incidencia/
│           ├── page.tsx          # Mapa + formulario (`/crear-incidencia`)
│           └── CrearIncidencia.module.scss
│
├── components/
│   ├── layout/                   # AppShell, Navbar, Sidebar
│   ├── dashboard/                # SummaryCards, TrendChart, IncidentsTable,
│   │                             # StatusPriorityCharts, DateRangeSelect,
│   │                             # CategoryRadarChart, ListWithBars,
│   │                             # TeamPerformance, SectionHeader, SubSection
│   ├── map/                      # MapView (Mapbox GL), MapToolbar
│   └── crear-incidencia/         # IncidentForm, useIncidentForm,
│                                 # IncidentForm.constants
│
├── lib/
│   ├── dashboard.ts              # Lógica de agregación: summary, chart data,
│   │                             #   resolvedores, reportadores, carga de trabajo,
│   │                             #   categorías, etiquetas, markers, filtro por rango
│   └── dashboard-helpers.ts      # helpers UI: clases CSS, iniciales, formato fechas
│
├── store/
│   ├── useAuthStore.ts           # Estado de autenticación (Zustand)
│   └── useIncidentStore.ts       # Estado de incidencias (Zustand) + mock data
│
├── types/
│   └── incident.ts               # Interfaces TypeScript (Incident, User, Tag, etc.)
│
├── styles/
│   ├── _variables.scss           # Tokens de diseño: colores, dimensiones, z-index
│   └── _mixins.scss              # Mixins reutilizables (flex-center, flex-between, icon-btn)
│
├── data/
│   └── incidents.mock.json       # 65 incidencias de construcción de ejemplo
│
└── app/globals.scss              # Reset global y estilos base
```

## Instalación y configuración

### Requisitos

- Node.js 20 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd spybee-challenge

# 2. Instalar dependencias
npm install

# 3. Crear archivo de entorno
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

| Variable                   | Descripción                                      |
| -------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token público de Mapbox para renderizar el mapa. |

> El token incluido es funcional para desarrollo local. Si caduca, genera uno nuevo en [mapbox.com](https://account.mapbox.com/access-tokens/).

## Cómo ejecutar

### Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Producción

```bash
npm run build
npm start
```

### Linter

```bash
npm run lint
```

## Credenciales de acceso

| Campo    | Valor                    |
| -------- | ------------------------ |
| Email    | superadmin@spybee.com   |
| Password | 123456                  |

La autenticación es completamente client-side (Zustand), sin backend.

## Decisiones de arquitectura

### State management con Zustand

Se usan dos stores independientes:

- **`useAuthStore`**: maneja sesión simulada con credenciales hardcodeadas. Expone `login`, `logout` y el objeto `user` (`email`, `userName`, `role`).
- **`useIncidentStore`**: almacena las 65 incidencias de prueba y permite agregar nuevas. Los datos mock se cargan desde un JSON al inicializar el store.

### Estructura de componentes feature-first

Los componentes se agrupan por funcionalidad (`dashboard/`, `map/`, `crear-incidencia/`, `layout/`), no por tipo técnico. Cada componente tiene su archivo `.tsx` y su `.module.scss` co-localizados.

### Route group para proteger rutas

Las rutas `/dashboard` y `/crear-incidencia` están dentro de un route group `(dashboard)` con su propio layout que verifica autenticación. Si no hay usuario en el store, redirige a `/`. El layout raíz es minimalista para que la página de login no herede la shell.

### Helpers de dashboard separados de la UI

La lógica de agregación de datos (`getSummary`, `buildChartData`, etc.) vive en `lib/dashboard.ts`, separada de los componentes de presentación. Los helpers de UI (formateo de fechas, asignación de clases CSS) están en `lib/dashboard-helpers.ts`.

### Mapbox GL con markers dinámicos

El mapa se inicializa en Bogotá con el estilo `streets-v12`. Los markers se crean con el `TriangleAlert` de Lucide renderizado mediante `createRoot` de React 19. Al crear una incidencia, el marker persiste porque los datos se obtienen del store de Zustand.

### Mock data

El archivo `src/data/incidents.mock.json` contiene 65 incidencias de construcción con metadatos completos: coordenadas geográficas, fechas, prioridades, estados, etiquetas, asignados y archivos multimedia.

### Responsive design

El dashboard se adapta con múltiples breakpoints: el AppShell cambia a una columna única en `< 480px`, el Sidebar se vuelve horizontal debajo del Navbar, las tarjetas de resumen se reordenan, y los títulos de secciones se envuelven en pantallas pequeñas.

### Paleta de colores

Los tokens de diseño están centralizados en `src/styles/_variables.scss`:

| Token               | Valor      | Uso                         |
| ------------------- | ---------- | --------------------------- |
| `$color-accent`     | `#FEC513`  | Acento amarillo, botones    |
| `$color-navbar-bg`  | `#3D3D3D`  | Fondo del navbar y login    |
| `$color-bg`         | `#f4f5f7`  | Fondo general del dashboard |
| `$color-surface`    | `#FFFFFF`  | Tarjetas, modales           |
