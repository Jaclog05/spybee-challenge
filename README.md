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
git clone https://github.com/Jaclog05/spybee-challenge.git
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
