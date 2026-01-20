# System Patterns - Arquitectura y Convenciones

## Stack Tecnológico

### Frontend
- **Framework:** React 18.3.1
- **Routing:** react-router-dom v6
- **UI Library:** react-bootstrap 2.x
- **Drag & Drop:** react-beautiful-dnd 13.1.1
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **Language:** JavaScript (con TypeScript en componentes TSX)

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4.x
- **ORM:** Prisma 5.13.0
- **Database:** PostgreSQL (via Docker)
- **Language:** TypeScript 4.9.5
- **Testing:** Jest 29.x + ts-jest

---

## Arquitectura Frontend

### Patrón de Componentes
**Organización:** Flat structure en `/frontend/src/components/`

**Componentes Principales:**
1. **RecruiterDashboard.js** - Vista raíz `/`
2. **Positions.tsx** - Listado de posiciones `/positions`
3. **PositionDetails.js** - Tablero Kanban `/positions/:id`
4. **StageColumn.js** - Columna droppable del Kanban
5. **CandidateCard.js** - Tarjeta draggable de candidato
6. **CandidateDetails.js** - Panel lateral (Offcanvas) con detalles
7. **AddCandidateForm.js** - Formulario de nuevo candidato

**Patrón de Estado:**
- **Local State:** `useState` para datos de componentes (ej: `positions`, `stages`, `selectedCandidate`)
- **Side Effects:** `useEffect` para fetch de datos al montar componente
- **No Redux:** Estado local por componente (sin estado global)

**Patrón de Comunicación:**
- **Fetch API** directamente desde componentes
- **Base URL hardcoded:** `http://localhost:3010`
- **CORS:** Backend permite origen `http://localhost:3000`

---

## Arquitectura Backend

### Patrón de Capas
Estructura basada en **Clean Architecture**:

```text
backend/src/
├── presentation/       # Controllers (Express request handlers)
│   └── controllers/
├── application/        # Services (business logic)
│   └── services/
├── domain/             # Models (entities)
│   └── models/
└── routes/             # API Routes (Express routers)
```

**Ejemplo de Flujo:**
1. Request → `routes/candidateRoutes.ts`
2. Route → `controllers/candidateController.ts`
3. Controller → `services/candidateService.ts`
4. Service → Prisma Client (DB)
5. Response ← Controller ← Service ← Prisma

**Middleware Personalizado:**
- **Prisma Injection:** Middleware en `index.ts` adjunta `prisma` a `req` object
- **CORS:** Configurado para `http://localhost:3000`
- **JSON Parser:** `express.json()` middleware

---

## Patrones de Drag & Drop (react-beautiful-dnd)

### Estructura de Componentes DnD
```javascript
<DragDropContext onDragEnd={handler}>
  {stages.map((stage, index) => (
    <Droppable droppableId={`${index}`}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {stage.candidates.map((candidate, idx) => (
            <Draggable draggableId={candidate.id} index={idx}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {/* Candidate Card */}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ))}
</DragDropContext>
```

### Datos del Evento `onDragEnd`
```javascript
{
  source: { droppableId: "0", index: 1 },
  destination: { droppableId: "2", index: 0 },
  draggableId: "123"
}
```

**Lógica de Actualización:**
1. Extraer candidato de `stages[source.droppableId].candidates[source.index]`
2. Insertar en `stages[destination.droppableId].candidates[destination.index]`
3. Actualizar estado local con `setStages([...stages])`
4. Persistir con `PUT /candidates/:id` enviando `{ applicationId, currentInterviewStep: destStageId }`

---

## Convenciones de Naming

### Frontend
- **Componentes:** PascalCase (ej: `PositionDetails.js`)
- **Props:** camelCase (ej: `onCardClick`, `selectedCandidate`)
- **Handlers:** Prefijo `handle` o `on` (ej: `handleCardClick`, `onDragEnd`)
- **API URLs:** Hardcoded strings (no env vars en client)

### Backend
- **Routes:** kebab-case (ej: `/interview-flow`)
- **Controllers:** Suffix `Controller` (ej: `candidateController.ts`)
- **Services:** Suffix `Service` (ej: `positionService.ts`)
- **Models:** PascalCase (ej: `Candidate.ts`)
- **Database Tables:** PascalCase con quotes (ej: `"Position"`, `"InterviewStep"`)

---

## Patrones de Testing

**Framework:** Cypress 13.x (implementado)

**Estructura Actual:**
```text
frontend/
├── cypress/
│   ├── e2e/
│   │   └── position_spec.cy.js    # Tests del tablero Kanban
│   ├── fixtures/                  # Datos mock
│   ├── support/
│   │   ├── commands.js            # Custom commands (ej: cy.dragAndDrop())
│   │   └── e2e.js                 # Setup global
│   └── cypress.config.js          # Configuración
```

**Plugins Utilizados:**
- **@4tw/cypress-drag-drop** (incorporado para simular eventos DnD)

**Estrategia de Selectores:**
- **data-testid:** Instrumentado con atributos `data-testid` en elementos críticos (ej: `data-testid="candidate-card-123"`)
- **Evitar:** Selectores basados en clases Bootstrap (frágiles)

**Patrón de Tests:**
```javascript
describe('Position Kanban Board', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
    cy.intercept('GET', '/positions/1/interviewFlow', { fixture: 'interviewFlow.json' });
    cy.intercept('GET', '/positions/1/candidates', { fixture: 'candidates.json' });
  });

  it('should move candidate between stages', () => {
    cy.get('[data-testid="candidate-card-1"]')
      .drag('[data-testid="stage-column-2"]');
    
    cy.wait('@updateCandidate');
    cy.get('[data-testid="stage-column-2"]')
      .should('contain', 'John Doe');
  });
});
```

---

## Principios de Diseño (Actuales)

1. **Separation of Concerns:** Frontend maneja UI/UX, Backend maneja lógica de negocio y persistencia
2. **RESTful API:** Endpoints siguen convenciones REST (GET, POST, PUT)
3. **Unidirectional Data Flow:** Estado fluye de padres a hijos vía props
4. **Optimistic UI Updates:** Actualizaciones locales inmediatas, sync con backend asíncrono
5. **Error Handling:** Console.error en frontend, try-catch en backend (mejorar con toast notifications)

---

## Próximos Pasos de Arquitectura (Backlog)
- [ ] Migrar componentes JS a TypeScript (consistencia)
- [ ] Implementar estado global con Context API o Zustand
- [ ] Añadir manejo de errores con react-toastify
- [ ] Crear custom hooks para fetch (ej: `useFetch`, `usePosition`)
- [ ] Configurar ESLint + Prettier en frontend
- [ ] Implementar SSR con Next.js (futuro)
