# Active Context - Estado Actual del Proyecto

**Última Actualización:** 2026-01-19  
**Fase Actual:** Configuración de Testing E2E con Cypress

---

## Estado del Sistema

### ✅ Completado
1. **Infraestructura Base**
   - Docker Compose configurado para PostgreSQL
   - Prisma schema con 11 modelos (Candidate, Position, InterviewStep, etc.)
   - Migraciones aplicadas exitosamente
   - Seed de datos ejecutado (2 posiciones + 3 candidatos + interview flows)

2. **Backend Funcional**
   - API REST en Express corriendo en `http://localhost:3010`
   - Endpoints críticos:
     - `GET /positions` - Listado de posiciones
     - `GET /positions/:id/interviewFlow` - Flujo de entrevistas de posición
     - `GET /positions/:id/candidates` - Candidatos de posición
     - `PUT /candidates/:id` - Actualizar etapa de candidato
   - CORS habilitado para `http://localhost:3000`

3. **Frontend Funcional**
   - React App corriendo en `http://localhost:3000`
   - Rutas implementadas:
     - `/` - Dashboard del reclutador
     - `/positions` - Listado de posiciones
     - `/positions/:id` - Tablero Kanban
     - `/add-candidate` - Formulario de nuevo candidato
   - Drag & Drop funcional con `react-beautiful-dnd`
   - Actualización persistente al backend al mover candidatos

---

## 🔧 En Progreso

### Tarea Activa: Integración de Cypress para Testing E2E

**Objetivo:** Asegurar la calidad del tablero Kanban mediante tests automatizados que validen:
- Navegación entre vistas
- Carga de datos desde API
- Drag & Drop de candidatos entre columnas
- Apertura de panel lateral con detalles
- Persistencia de cambios en backend

**Subtareas:**
1. [x] ✅ Instalar Cypress y plugin de Drag & Drop (COMPLETADO 2026-01-19)
   ```bash
   cd frontend
   npm install --save-dev cypress @4tw/cypress-drag-drop
   ```

2. [x] ✅ Inicializar configuración de Cypress (COMPLETADO 2026-01-19)
   - Creado `frontend/cypress.config.js`
   - Configurado baseUrl, viewport (1280x720)
   - Estructura de carpetas creada: `cypress/e2e/`, `cypress/fixtures/`, `cypress/support/`

3. [x] ✅ Configurar `cypress.config.js` (COMPLETADO 2026-01-19)
   ```javascript
   module.exports = defineConfig({
     e2e: {
       baseUrl: 'http://localhost:3000',
       viewportWidth: 1280,
       viewportHeight: 720,
       supportFile: 'cypress/support/e2e.js',
     },
   });
   ```

4. [x] ✅ Instalar plugin de Drag & Drop en `cypress/support/e2e.js` (COMPLETADO 2026-01-19)
   ```javascript
   require('@4tw/cypress-drag-drop');
   ```
   - Creado `cypress/support/commands.js` con comando custom `dragCandidateToStage`
   - Scripts añadidos a `package.json`: `cy:open`, `cy:run`

5. [ ] 🔧 **TAREA ACTIVA:** Crear fixtures para mock de respuestas API
   - [ ] `cypress/fixtures/interviewFlow.json`
   - [ ] `cypress/fixtures/candidates.json`

6. [ ] Escribir spec principal: `cypress/e2e/position_spec.cy.js`
   - Test 1: Cargar tablero Kanban
   - Test 2: Mover candidato entre columnas
   - Test 3: Verificar llamada PUT al backend
   - Test 4: Abrir panel lateral al clic en tarjeta

7. [ ] Añadir `data-testid` attributes a componentes:
   - `PositionDetails.js`: `data-testid="stage-column-{index}"`
   - `CandidateCard.js`: `data-testid="candidate-card-{id}"`
   - `CandidateDetails.js`: `data-testid="candidate-details-panel"`

8. [ ] Ejecutar tests y validar cobertura
   ```bash
   npx cypress run --spec "cypress/e2e/position_spec.cy.js"
   ```

---

## Decisiones Técnicas Recientes

### 0. Cypress Configurado Exitosamente (2026-01-19)
**Acción:** Instalación y configuración base de Cypress con plugin `@4tw/cypress-drag-drop`.  
**Estado:** ✅ Completado. Entorno listo para escribir tests.  
**Próximo Paso:** Crear fixtures con datos mock para Position 1.

### 1. Drag & Drop con react-beautiful-dnd (No Cambiar)
**Decisión:** Mantener `react-beautiful-dnd` a pesar de estar en mantenimiento.  
**Razón:** Ya implementado, estable, y funcionando. Migrar a alternativas (dnd-kit, react-dnd) requiere refactorización completa.  
**Implicación para Cypress:** Necesita plugin `@4tw/cypress-drag-drop` para simular eventos de arrastre.

### 2. TypeScript Parcial en Frontend
**Estado Actual:** Mix de archivos `.js` y `.tsx`.  
**Decisión:** NO migrar todo a TS ahora, mantener status quo.  
**Razón:** Priorizar tests E2E sobre refactorización.

### 3. Backend tsconfig.json Actualizado
**Cambio:** Añadido `"prisma/**/*.ts"` a `include` array.  
**Razón:** Compilar `seed.ts` a `dist/prisma/seed.js` para evitar errores de `ts-node`.  
**Beneficio:** Seed ejecutable con `node dist/prisma/seed.js`.

---

## Bloqueos y Dependencias

### ⚠️ Bloqueos Actuales
**Ninguno.** Backend y frontend funcionan correctamente.

### 🔗 Dependencias para Continuar
1. **Cypress no instalado:** Requiere `npm install --save-dev cypress @4tw/cypress-drag-drop`
2. **Sin `data-testid` attributes:** Componentes carecen de selectores estables para tests
3. **Sin fixtures:** Necesita datos mock para tests sin dependencia de backend

---

## Próximos Pasos Inmediatos

### Paso 1: Configurar Cypress (Hoy)
```bash
cd frontend
npm install --save-dev cypress@^13.6.0 @4tw/cypress-drag-drop@^2.2.5
npx cypress open
```

### Paso 2: Crear Estructura de Tests (Hoy)
```
frontend/cypress/
├── e2e/
│   └── position_spec.cy.js
├── fixtures/
│   ├── interviewFlow.json
│   └── candidates.json
└── support/
    └── e2e.js  # Import plugin drag-drop
```

### Paso 3: Primer Test (Hoy)
Escribir test básico de carga de tablero:
```javascript
describe('Position Kanban Board', () => {
  it('should load position details and display stages', () => {
    cy.visit('/positions/1');
    cy.contains('Senior Full-Stack Engineer').should('be.visible');
    cy.get('[data-testid="stage-column-0"]').should('contain', 'Initial Screening');
  });
});
```

### Paso 4: Añadir Selectores (Mañana)
Modificar componentes para incluir `data-testid`:
- `PositionDetails.js`: Añadir a `<StageColumn>` wrapper
- `CandidateCard.js`: Añadir al `<Card>` principal

---

## Recursos de Referencia

### Documentación Externa
- **Cypress Docs:** https://docs.cypress.io
- **Cypress Drag & Drop Plugin:** https://github.com/4teamwork/cypress-drag-drop
- **react-beautiful-dnd Docs:** https://github.com/atlassian/react-beautiful-dnd

### Archivos Clave del Proyecto
- **Frontend Entry Point:** `frontend/src/App.js`
- **Kanban Component:** `frontend/src/components/PositionDetails.js`
- **API Spec:** `backend/api-spec.yaml`
- **Prisma Schema:** `backend/prisma/schema.prisma`

---

## Notas del QA Lead

> **Importante:** Todos los tests deben ejecutarse contra el backend REAL corriendo en `http://localhost:3010`. No usar mocks de API en tests E2E (solo en fixtures para escenarios de error).

> **Tip:** Usar `cy.intercept()` para verificar llamadas al backend, pero NO para bloquearlas (ej: `cy.intercept('PUT', '/candidates/*').as('updateCandidate')`).

> **Advertencia:** `react-beautiful-dnd` NO funciona con selectores CSS tradicionales en Cypress. SIEMPRE usar el plugin `@4tw/cypress-drag-drop`.
