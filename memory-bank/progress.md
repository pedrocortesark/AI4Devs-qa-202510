# Progress - Historial y Roadmap

**Proyecto:** LTI Talent Tracking System  
**Inicio:** 2024-05-28 (Primera migración de Prisma)  
**Última Actualización:** 2026-01-19

---

## Hitos Completados

### ✅ Fase 1: Infraestructura Base (2024-05)
- [x] Configuración de Docker Compose para PostgreSQL
- [x] Prisma schema inicial con modelos Candidate, Education, WorkExperience, Resume
- [x] Migraciones de base de datos (4 migraciones aplicadas)
- [x] Seed script con datos de prueba

### ✅ Fase 2: Backend API (2024-05 - 2024-06)
- [x] Express server en TypeScript
- [x] Arquitectura en capas (presentation → application → domain)
- [x] Endpoints de Candidates:
  - [x] GET `/candidates`
  - [x] POST `/candidates`
  - [x] PUT `/candidates/:id`
- [x] Endpoints de Positions:
  - [x] GET `/positions`
  - [x] GET `/positions/:id/interviewFlow`
  - [x] GET `/positions/:id/candidates`
- [x] Modelos ampliados: Company, Employee, InterviewType, InterviewFlow, InterviewStep, Position, Application, Interview
- [x] Middleware de CORS habilitado
- [x] File upload con Multer

### ✅ Fase 3: Frontend React (2024-06)
- [x] Create React App setup
- [x] React Router v6 para navegación
- [x] React Bootstrap para UI
- [x] Componentes principales:
  - [x] RecruiterDashboard (landing page)
  - [x] Positions (listado con filtros)
  - [x] PositionDetails (tablero Kanban)
  - [x] AddCandidateForm
  - [x] CandidateDetails (panel lateral)
- [x] Integración de `react-beautiful-dnd` para Drag & Drop
- [x] Conexión con API backend
- [x] Actualización persistente de candidatos al mover entre etapas

### ✅ Fase 4: Refinamiento y Documentación (2024-06 - 2026-01)
- [x] API Spec en OpenAPI (api-spec.yaml)
- [x] Documento de Modelo de Datos (ModeloDatos.md)
- [x] Manifiesto de Buenas Prácticas (ManifestoBuenasPracticas.md)
- [x] README con instrucciones de setup
- [x] Tests unitarios en backend (Jest + ts-jest)
- [x] Tests de controladores y servicios

---

## 🔧 Fase Actual: Testing E2E con Cypress (2026-01)

### Objetivo
Asegurar la calidad del sistema mediante tests End-to-End que validen flujos críticos de usuario, especialmente el tablero Kanban con Drag & Drop.

### Tareas en Progreso
- [x] ✅ **Instalación de Cypress** (COMPLETADO 2026-01-19)
  - [x] `npm install --save-dev cypress @4tw/cypress-drag-drop`
  - [x] Inicialización: Estructura de carpetas creada

- [x] ✅ **Configuración Base** (COMPLETADO 2026-01-19)
  - [x] Crear `frontend/cypress.config.js`
  - [x] Configurar plugin de Drag & Drop en `cypress/support/e2e.js`
  - [x] Establecer `baseUrl: http://localhost:3000`, viewport 1280x720
  - [x] Crear `cypress/support/commands.js` con comando custom `dragCandidateToStage`
  - [x] Añadir scripts `cy:open` y `cy:run` a `package.json`

- [x] ✅ **Preparación de Fixtures** (COMPLETADO 2026-01-19)
  - [x] `cypress/fixtures/interviewFlow.json` (mock de GET /positions/1/interviewFlow)
  - [x] `cypress/fixtures/candidates.json` (mock de GET /positions/1/candidates)

- [x] ✅ **Escritura de Tests** (COMPLETADO 2026-01-19)
  - [x] **Spec Principal: `position_spec.cy.js`** - 8 Tests Implementados:
    - [x] Test 1: Renderizado de columnas del flujo de entrevistas
    - [x] Test 2: Renderizado de candidatos en columnas correctas
    - [x] Test 3: Visualización de ratings (círculos verdes)
    - [x] Test 4: Drag & Drop entre columnas + verificación de llamada PUT
    - [x] Test 5: Reordenamiento dentro de la misma columna
    - [x] Test 6: Navegación - botón "Volver a Posiciones"
    - [x] Test 7: Manejo de errores de API (500)
    - [x] Test 8: Cancelación de drag (soltar fuera de zona válida)
  - **Estrategia:** Hybrid Mocking con `cy.intercept()` para fixtures
  - **Selectores:** Usando `data-rbd-draggable-id` y `data-rbd-droppable-id` de react-beautiful-dnd

- [ ] **Refactorización para Testing** (Opcional - Mejora Futura)
  - [ ] Añadir `data-testid` a componentes:
    - [ ] `PositionDetails.js` → columnas Kanban
    - [ ] `CandidateCard.js` → tarjetas de candidatos
    - [ ] `CandidateDetails.js` → panel lateral
  - [ ] Extraer URLs de API a constantes (ej: `API_BASE_URL`)

- [ ] 🔧 **Ejecución y Validación** (TAREA ACTIVA)
  - [ ] Ejecutar tests en modo interactivo: `npx cypress open`
  - [ ] Ejecutar tests headless: `npx cypress run`
  - [ ] Validar que todos los 8 tests pasan correctamente
  - [ ] Ajustar selectores si es necesario
  - [ ] Documentar resultados en walkthrough.md

---

## Próximas Fases (Roadmap)

### Fase 6: CI/CD para Tests E2E (Q1 2026)
- [ ] Configurar GitHub Actions para ejecutar `cypress run` en cada PR
- [ ] Generar reportes HTML de tests
- [ ] Configurar Cypress Dashboard (opcional)
- [ ] Tests en múltiples navegadores (Chrome, Firefox, Edge)

### Fase 7: Mejoras de UX (Q2 2026)
- [ ] Toast notifications para feedback de acciones (react-toastify)
- [ ] Loading spinners durante fetch de datos
- [ ] Error boundaries para manejo de errores React
- [ ] Skeleton loaders en listado de posiciones

### Fase 8: Features Avanzadas (Q2-Q3 2026)
- [ ] Búsqueda y filtros en tiempo real (Positions view)
- [ ] Paginación de candidatos (si > 50 por posición)
- [ ] Editar posiciones (actualmente solo "Ver proceso")
- [ ] Asignación de entrevistadores (Employee) a InterviewSteps
- [ ] Calendario de entrevistas (DatePicker integration)
- [ ] Exportar datos a Excel/PDF

### Fase 9: Migración a TypeScript Completo (Q3 2026)
- [ ] Migrar componentes JS a TSX
- [ ] Definir tipos para API responses
- [ ] Compartir tipos entre frontend y backend (ej: `shared/types.ts`)

### Fase 10: Performance & Scalability (Q4 2026)
- [ ] Implementar Server-Side Rendering con Next.js
- [ ] Optimización de queries con Prisma (incluir joins)
- [ ] Caching con Redis
- [ ] CDN para assets estáticos

---

## Métricas de Progreso

### Backend
- **Endpoints Implementados:** 8/12 (67%)
- **Cobertura de Tests Unitarios:** ~40% (basado en archivos .test.ts existentes)
- **Modelos Prisma:** 11/11 (100%)

### Frontend
- **Componentes Implementados:** 7/7 (100% de MVP)
- **Rutas Implementadas:** 4/4 (100%)
- **Tests E2E:** 0/5 (0% - en progreso)

### Infraestructura
- **Docker:** ✅ Configurado
- **Prisma Migrations:** ✅ 4 migraciones aplicadas
- **Seed Data:** ✅ Funcional

---

## Decisiones Arquitectónicas Importantes

### 1. Mantener react-beautiful-dnd (2026-01-19)
**Contexto:** Librería en modo mantenimiento (último release 2021).  
**Alternativas Evaluadas:** dnd-kit, react-dnd.  
**Decisión:** Mantener `react-beautiful-dnd` hasta que falle o bloquee features.  
**Razón:** Refactorización completa no justifica beneficio inmediato. Tests E2E asegurarán que funcione correctamente.

### 2. TypeScript Parcial en Frontend (2026-01-19)
**Contexto:** Mix de archivos .js y .tsx.  
**Decisión:** NO migrar todo a TypeScript ahora.  
**Razón:** Priorizar testing E2E sobre refactorización. Migración gradual en futuro.

### 3. Hardcoded API URLs (2024-06)
**Contexto:** URLs como `http://localhost:3010` están en código.  
**Decisión:** Mantener temporalmente, migrar a `.env` en Fase 7.  
**Razón:** Simplifica desarrollo inicial. No afecta MVP.

### 4. Backend tsconfig.json Modificado (2026-01-19)
**Contexto:** `seed.ts` causaba error con `ts-node`.  
**Decisión:** Incluir `"prisma/**/*.ts"` en `tsconfig.json` para compilar seed.  
**Solución:** Ejecutar `node dist/prisma/seed.js` en lugar de `ts-node prisma/seed.ts`.

---

## Problemas Resueltos

### 1. Error al ejecutar seed con ts-node (2026-01-19)
**Síntoma:** `Error: Debug Failure. False expression: Non-string value passed to ts.resolveTypeReferenceDirective`  
**Causa:** Incompatibilidad entre versión de `ts-node` y `typescript`.  
**Solución:** Compilar `seed.ts` a `dist/prisma/seed.js` y ejecutar con Node.

### 2. Base de datos vacía (2026-01-19)
**Síntoma:** Dashboard no mostraba posiciones.  
**Causa:** Migraciones aplicadas pero seed no ejecutado.  
**Solución:** `node dist/prisma/seed.js` insertó 2 posiciones + 3 candidatos + interview flows.

---

## Notas de Equipo

> **QA Lead (2026-01-19):** Priorizar tests de Drag & Drop. Es la feature más compleja y crítica. Usar `cy.intercept()` para validar llamadas PUT, pero NO mockear respuestas en E2E (solo en fixtures para casos de error).

> **Backend Lead (2024-06):** Mantener separación de capas (presentation → application → domain). NO llamar Prisma directamente desde controllers.

> **Frontend Lead (2024-06):** Evitar props drilling. Si componentes necesitan compartir estado, considerar Context API en Fase 7.

---

## Dependencias Externas

### Bloqueadas (Waiting On)
- Ninguna actualmente.

### Deseables (Nice to Have)
- **Cypress Dashboard:** Para reportes visuales de tests (requiere licencia).
- **Playwright:** Alternativa a Cypress si surge limitación con Drag & Drop plugin.
