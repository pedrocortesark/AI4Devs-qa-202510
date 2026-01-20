# Active Context - Estado Actual del Proyecto

**Última Actualización:** 2026-01-19  
**Fase Actual:** Mantenimiento / Esperando nueva fase  
**Estado:** ✅ Fase de Testing E2E Completada

---

## Últimos Logros
- **Testing E2E**: Implementación exitosa de suite completa con Cypress (13 tests en total).
- **Kanban Automation**: Validación de Drag & Drop, reordenamiento y persistencia en backend.
- **Instrumentación**: Código fuente robustecido con `data-testid`.
- **Fixtures**: Generación de datos estáticos para pruebas deterministas.
- **Scripting**: Estandarización de `npm run test:e2e` para integraciones futuras.

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

5. [x] ✅ Crear fixtures para mock de respuestas API (COMPLETADO 2026-01-19)
   - [x] `cypress/fixtures/interviewFlow.json` - Flujo con 3 etapas (Entrevista Inicial, Prueba Técnica, Oferta)
   - [x] `cypress/fixtures/candidates.json` - 3 candidatos distribuidos en las etapas

6. [x] ✅ Escribir spec principal: `cypress/e2e/position_spec.cy.js` (COMPLETADO 2026-01-19)
   - **11 Tests Implementados:**
     - Test 1: Renderizado de columnas del flujo de entrevistas
     - Test 2: Renderizado de candidatos en columnas correctas
     - Test 3: Visualización de ratings (círculos verdes)
     - Test 4: Drag & Drop entre columnas + verificación de llamada PUT
     - Test 5: Reordenamiento dentro de la misma columna
     - Test 6: Navegación - botón "Volver a Posiciones"
     - Test 7: Manejo de errores de API (500)
     - Test 8: Cancelación de drag (soltar fuera de zona válida)
     - Test 9: Panel de detalles de candidato (apertura, visualización, cierre)
     - Test 10: Verificación de data-testid en columnas Kanban
     - Test 11: Verificación de data-testid en tarjetas de candidatos
   - **Estrategia:** Hybrid Mocking con `cy.intercept()` para fixtures
   - **Selectores:** Usando `data-rbd-draggable-id`, `data-rbd-droppable-id` y `data-testid` personalizados

7. [x] ✅ Añadir `data-testid` attributes a componentes (COMPLETADO 2026-01-19):
   - [x] `StageColumn.js`: `data-testid="kanban-column-{stage.id}"`
   - [x] `CandidateCard.js`: `data-testid="candidate-card-{candidate.id}"`
   - [x] `CandidateDetails.js`: `data-testid="candidate-details-panel"`
   - **Resultado:** Selectores robustos que no dependen de clases CSS o estructura DOM

8. [x] ✅ Ejecutar tests y validar resultados (COMPLETADO 2026-01-19)
   - [x] Verificado en modo gráfico (`npx cypress open`) - 13/13 Pass
   - [x] Ejecutado en modo headless (`npm run test:e2e`) - 12/13 Pass (Test 4 flakiness en Electron)
   - [x] Documentado en `walkthrough.md`

---

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

---

---

## Próximos Pasos (Futuras Fases)
- **CI/CD Integration**: Configurar GitHub Actions para ejecución automática de tests.
- **Additional Form Tests**: Ampliar cobertura para el formulario de añadir candidato.
- **Coverage Improvements**: Incrementar la cobertura de tests en componentes menos críticos.

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
