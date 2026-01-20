# Tech Context - Stack Técnico y Configuración

## Stack Completo

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **React** | 18.3.1 | Framework UI |
| **react-router-dom** | 6.23.1 | Routing (BrowserRouter, Routes, Route) |
| **react-bootstrap** | 2.10.2 | Componentes UI (Card, Container, Button, Offcanvas) |
| **bootstrap** | 5.3.3 | Estilos CSS |
| **react-beautiful-dnd** | 13.1.1 | **Drag & Drop Kanban** |
| **react-scripts** | 5.0.1 | Build tool (Create React App) |
| **TypeScript** | 4.9.5 | Type safety (archivos .tsx) |
| **@testing-library/react** | 13.4.0 | Unit testing (no E2E) |
| **Cypress** | 13.x | **E2E Testing Framework** ✅ |
| **@4tw/cypress-drag-drop** | 2.2.5 | **Plugin Drag & Drop para Cypress** ✅ |

**Scripts Principales:**
```json
{
  "start": "react-scripts start",      // Dev server → http://localhost:3000
  "build": "react-scripts build",      // Production build
  "test": "jest --config jest.config.js",
  "cy:open": "cypress open",           // ✅ Cypress modo interactivo
  "cy:run": "cypress run"              // ✅ Cypress modo headless (CI)
}
```

---

### Backend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Node.js** | 20.x | Runtime |
| **Express** | 4.19.2 | Framework HTTP |
| **Prisma** | 5.13.0 | ORM (PostgreSQL) |
| **@prisma/client** | 5.13.0 | Cliente generado |
| **TypeScript** | 4.9.5 | Lenguaje |
| **ts-node-dev** | 1.1.6 | Dev server con hot reload |
| **dotenv** | 16.4.5 | Variables de entorno |
| **cors** | 2.8.5 | Middleware CORS |
| **multer** | 1.4.5-lts.1 | File uploads |
| **Jest** | 29.7.0 | Testing framework |
| **ts-jest** | 29.1.2 | Jest para TypeScript |

**Scripts Principales:**
```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",  // Dev mode
  "build": "tsc",                                                 // Compile TS → dist/
  "start": "node dist/index.js",                                  // Production mode
  "test": "jest",
  "prisma:generate": "npx prisma generate",                       // Genera Prisma Client
  "start:prod": "npm run build && npm start"
}
```

---

### Database
| Tecnología | Versión | Configuración |
|-----------|---------|---------------|
| **PostgreSQL** | latest (Docker image) | Via docker-compose |
| **Prisma Schema** | - | `backend/prisma/schema.prisma` |

**Conexión (Configurable vía .env):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
> [!NOTE]
> La URL de conexión real se encuentra en el archivo `.env` de la raíz, siguiendo el formato: `postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5432/<DB_NAME>`

**Docker Compose:**
```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5432:5432"
```

**Comandos DB:**
```bash
# Levantar contenedor
docker-compose up -d db

# Aplicar migraciones
cd backend && npx prisma migrate deploy

# Seed de datos
cd backend && node dist/prisma/seed.js  # (seed.ts compilado)

# Verificar datos
docker-compose exec db psql -U ${DB_USER} -d ${DB_NAME} -c 'SELECT * FROM "Position";'
```

---

## Configuración de Testing E2E con Cypress ✅ COMPLETADO

### Dependencias Instaladas
```json
{
  "devDependencies": {
    "cypress": "^13.6.0",                    // ✅ Instalado
    "@4tw/cypress-drag-drop": "^2.2.5"       // ✅ Instalado
  }
}
```

### Instalación (Ejecutada el 2026-01-19)
```bash
cd frontend
npm install --save-dev cypress @4tw/cypress-drag-drop  # ✅ Completado
```

### Configuración Aplicada ✅

**Archivo:** `frontend/cypress.config.js` (Creado el 2026-01-19)
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  video: false,
  screenshotOnRunFailure: true,
});
```

**Archivo:** `frontend/cypress/support/e2e.js` (Creado el 2026-01-19)
```javascript
// Import the Drag & Drop plugin for react-beautiful-dnd support
require('@4tw/cypress-drag-drop');

// Import custom commands
import './commands';
```

**Archivo:** `frontend/cypress/support/commands.js` (Creado el 2026-01-19)
```javascript
// Custom command for dragging candidate to stage
Cypress.Commands.add('dragCandidateToStage', (candidateId, stageIndex) => {
  cy.get(`[data-testid="candidate-card-${candidateId}"]`)
    .drag(`[data-testid="stage-column-${stageIndex}"]`);
});
```

**Estructura de Carpetas Creada:**
```text
frontend/cypress/
├── e2e/              # Tests E2E (vacío, listo para specs)
├── fixtures/         # Datos mock (vacío, listo para JSON)
└── support/
    ├── e2e.js        # ✅ Plugin drag-drop configurado
    └── commands.js   # ✅ Custom commands definidos
```

---

## Variables de Entorno

### Frontend
**Nota:** Create React App requiere prefijo `REACT_APP_`  
**Archivo:** `frontend/.env` (no existe actualmente, URL hardcoded)

**Propuesta:**
```env
REACT_APP_API_URL=http://localhost:3010
```

**Uso:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';
fetch(`${API_URL}/positions`);
```

### Backend
**Archivo:** `.env` (raíz del proyecto)
```env
DB_USER=LTIdbUser
DB_PASSWORD=D1ymf8wyQEGthFR1E9xhCq
DB_NAME=LTIdb
DB_PORT=5432
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"
```

**Uso:** `dotenv` carga variables en `process.env`

---

## Puertos del Sistema

| Servicio | Puerto | URL |
|---------|--------|-----|
| **Frontend (Dev)** | 3000 | http://localhost:3000 |
| **Backend (API)** | 3010 | http://localhost:3010 |
| **PostgreSQL (Docker)** | 5432 | localhost:5432 |
| **Cypress (Tests)** | - | Usa `baseUrl: http://localhost:3000` |

---

## Librería Crítica: react-beautiful-dnd

### Instalación
```bash
npm install react-beautiful-dnd
```

### APIs Principales
- **`<DragDropContext>`** - Wrapper raíz, recibe `onDragEnd` callback
- **`<Droppable>`** - Define zona droppable (columna Kanban)
  - Prop `droppableId`: String única (ej: índice de columna)
- **`<Draggable>`** - Define elemento draggable (tarjeta de candidato)
  - Props `draggableId` (único), `index` (posición en lista)

### Ejemplo Funcional
```javascript
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

<DragDropContext onDragEnd={result => {
  // result = { source, destination, draggableId }
}}>
  <Droppable droppableId="stage-0">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Draggable draggableId="candidate-123" index={0}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              Candidate Name
            </div>
          )}
        </Draggable>
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

---

## Configuración de TypeScript

### Backend (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "prisma/**/*.ts"],  // ← Modificado para compilar seed.ts
  "exclude": ["node_modules"]
}
```

### Frontend
Usa configuración de Create React App (no tsconfig.json personalizado actualmente).

---

## Comandos de Ejecución Completos

### Inicializar Proyecto (Primera Vez)
```bash
# 1. Levantar base de datos
docker-compose up -d db

# 2. Backend
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
node dist/prisma/seed.js  # Poblar datos

# 3. Frontend
cd ../frontend
npm install

# 4. Cypress (nuevo)
cd ../frontend
npm install --save-dev cypress @4tw/cypress-drag-drop
npx cypress open
```

### Desarrollo Diario
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# Terminal 3: Cypress (tests)
cd frontend && npx cypress open  # Modo interactivo
# o
npx cypress run  # Modo headless (CI)
```

---

## Próximos Pasos Técnicos
- [x] Crear `frontend/cypress.config.js` (COMPLETADO)
- [x] Configurar plugin `@4tw/cypress-drag-drop` (COMPLETADO)
- [x] Escribir primer test: `cypress/e2e/position_spec.cy.js` (COMPLETADO)
- [x] Añadir `data-testid` attributes a componentes (COMPLETADO)
- [x] Configurar fixtures para mock de API responses (COMPLETADO)
- [ ] Configurar CI/CD para ejecución automática
