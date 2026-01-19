# Product Context - Flujos de Usuario y Funcionalidades

## Roles del Sistema
- **Reclutador:** Gestiona candidatos, crea posiciones, mueve candidatos entre etapas
- **Hiring Manager:** Visualiza el estado de candidatos en su posición (futuro: asignar entrevistas)

---

## Flujos de Usuario Principales

### 1. Navegación Inicial (Dashboard)
**Ruta:** `/`  
**Componente:** `RecruiterDashboard.js`

**User Story:**  
Como reclutador, quiero ver un dashboard con accesos rápidos a "Añadir Candidato" y "Ver Posiciones" para gestionar mi trabajo.

**Elementos UI:**
- Logo de LTI
- 2 Cards con botones:
  - "Añadir Nuevo Candidato" → navega a `/add-candidate`
  - "Ir a Posiciones" → navega a `/positions`

---

### 2. Vista de Posiciones (Listado)
**Ruta:** `/positions`  
**Componente:** `Positions.tsx`

**User Story:**  
Como reclutador, quiero ver todas las posiciones abiertas con filtros (título, fecha, estado, manager) para encontrar rápidamente la que necesito gestionar.

**API Endpoint:**  
`GET http://localhost:3010/positions`  
Respuesta: Array de objetos `{ id, title, contactInfo, applicationDeadline, status }`

**Elementos UI:**
- Botón "Volver al Dashboard"
- Filtros: Buscar por título, fecha, estado (Open/Closed/Draft/Contratado), manager
- Grid de Cards (3 columnas) mostrando:
  - Título de posición
  - Manager (contactInfo)
  - Deadline (formato DD/MM/YYYY)
  - Badge de estado (color según status)
  - Botones: "Ver proceso", "Editar"

**Interacción Crítica:**  
Al hacer clic en "Ver proceso" → navega a `/positions/:id`

---

### 3. Detalles de Posición (Tablero Kanban)
**Ruta:** `/positions/:id`  
**Componente:** `PositionDetails.js`

**User Story:**  
Como reclutador, quiero ver un tablero Kanban con candidatos organizados por etapa de entrevista, y poder moverlos arrastrando las tarjetas para actualizar su estado en tiempo real.

**APIs Endpoints:**
1. **Obtener flujo de entrevistas:**  
   `GET http://localhost:3010/positions/:id/interviewFlow`  
   Respuesta: `{ interviewFlow: { positionName, interviewFlow: { interviewSteps: [{ id, name, orderIndex }] } } }`

2. **Obtener candidatos de la posición:**  
   `GET http://localhost:3010/positions/:id/candidates`  
   Respuesta: Array de `{ candidateId, fullName, averageScore, currentInterviewStep, applicationId }`

3. **Actualizar etapa del candidato:**  
   `PUT http://localhost:3010/candidates/:id`  
   Body: `{ applicationId: number, currentInterviewStep: number }`

**Elementos UI:**
- Botón "Volver a Posiciones"
- Título de posición (ej: "Senior Full-Stack Engineer")
- Columnas Kanban (una por InterviewStep):
  - Header: Nombre del step (ej: "Initial Screening", "Technical Interview")
  - Cards de candidatos (componente `CandidateCard.js`):
    - Nombre completo
    - Rating (🟢 × `averageScore`)
- Panel lateral (`Offcanvas`): Se abre al hacer clic en tarjeta, muestra detalles del candidato

**Interacción Crítica - Drag & Drop:**
1. Usuario arrastra tarjeta de candidato desde columna origen
2. Suelta en columna destino
3. `onDragEnd()` actualiza estado local (React)
4. `updateCandidateStep()` envía PUT al backend con nuevo `currentInterviewStep`
5. Candidato permanece en nueva columna (persistencia)

**Librería:** `react-beautiful-dnd`
- `<DragDropContext onDragEnd={onDragEnd}>`
- `<Droppable droppableId={index}>`
- `<Draggable draggableId={candidate.id} index={idx}>`

---

### 4. Añadir Candidato
**Ruta:** `/add-candidate`  
**Componente:** `AddCandidateForm.js`

**User Story:**  
Como reclutador, quiero añadir un nuevo candidato con su información personal, educación y experiencia para iniciar su proceso de selección.

**API Endpoint:**  
`POST http://localhost:3010/candidates`  
Body: `{ firstName, lastName, email, phone, address, educations[], workExperiences[], resumes[] }`

---

## Estados de Posición
- **Open:** Posición activa, aceptando candidatos
- **Closed:** Posición cerrada
- **Draft (Borrador):** Posición en construcción
- **Contratado:** Posición con candidato contratado

---

## Consideraciones de UX para Testing E2E
1. **Esperas Asíncronas:** Todas las llamadas API usan `fetch()` con `useEffect()`, los tests deben esperar respuestas.
2. **Drag & Drop:** Cypress requiere plugin especial para simular `react-beautiful-dnd` (ej: `@4tw/cypress-drag-drop`).
3. **Offcanvas:** El panel lateral usa `react-bootstrap`, hay animaciones de entrada/salida.
4. **Formato de Fechas:** Las deadlines se formatean en cliente a DD/MM/YYYY.
