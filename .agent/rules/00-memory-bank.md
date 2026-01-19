---
description: "Flujo de Trabajo Obligatorio del Banco de Memoria"
globs: ["**/*"]
alwaysApply: true
priority: critical
---

# MANDATO DEL AGENTE: Acceso a Memoria Compartida

Estás trabajando en un entorno multi-agente (Antigravity). Debes confiar en el "Memory Bank" como la única fuente de la verdad.

## 1. Carga de Contexto (LEER PRIMERO)
Antes de planificar o ejecutar CUALQUIER tarea, DEBES leer:
- `memory-bank/activeContext.md` → Para entender el enfoque actual (QA/Cypress).
- `memory-bank/systemPatterns.md` → Para respetar la arquitectura y selectores.
- `memory-bank/techContext.md` → Para usar los comandos y librerías correctas (Drag&Drop, etc).

## 2. Actualizaciones Atómicas (ESCRIBIR AL FINALIZAR)
Después de completar una tarea:
1.  **Actualizar** `memory-bank/activeContext.md`: Elimina tu tarea finalizada, añade el resultado.
2.  **Actualizar** `memory-bank/progress.md`: Marca las funcionalidades como completadas.
3.  **Autocorrección**: Si encuentras que `projectbrief.md` o `systemPatterns.md` están desactualizados, actualízalos inmediatamente.

## 3. Acciones Prohibidas
- No inventes comandos que no aparezcan en `techContext.md`.
- No modifiques la arquitectura central sin actualizar primero `systemPatterns.md`.
- No elimines o ignores el contenido de `activeContext.md` al iniciar una tarea.

## 4. Protocolo de Iniciación
Al recibir una nueva tarea:
1. Lee `activeContext.md` → ¿Qué está en progreso?
2. Lee `systemPatterns.md` → ¿Qué patrones debo respetar?
3. Lee `techContext.md` → ¿Qué herramientas están disponibles?
4. Ejecuta la tarea respetando el contexto.
5. Actualiza `activeContext.md` y `progress.md` con los resultados.

## 5. Resolución de Conflictos
Si encuentras información contradictoria:
1. **Prioridad 1:** `activeContext.md` (estado actual es la verdad)
2. **Prioridad 2:** `systemPatterns.md` (arquitectura es inamovible)
3. **Prioridad 3:** `techContext.md` (stack técnico define límites)
4. **Prioridad 4:** `productContext.md` y `projectbrief.md` (visión de negocio)

Si algo no tiene sentido, PREGUNTA al usuario antes de asumir.

## 6. Testing E2E - Contexto Específico
Para tareas relacionadas con Cypress o testing:
- **SIEMPRE** lee `activeContext.md` para saber qué tests están pendientes.
- **SIEMPRE** verifica `techContext.md` para confirmar plugins instalados (ej: `@4tw/cypress-drag-drop`).
- **SIEMPRE** respeta selectores definidos en `systemPatterns.md` (ej: `data-testid` attributes).
- **NUNCA** uses mocks de API en tests E2E (solo en fixtures para casos de error).

## 7. Ejemplo de Flujo Correcto

### Tarea: "Escribe un test de Cypress para el Drag & Drop"

**Paso 1 - Leer Contexto:**
```
✅ Leí activeContext.md → Cypress aún no está instalado
✅ Leí techContext.md → Necesito @4tw/cypress-drag-drop
✅ Leí systemPatterns.md → Debo añadir data-testid a componentes
```

**Paso 2 - Planificar:**
```
1. Instalar Cypress y plugin
2. Configurar cypress.config.js
3. Añadir data-testid a CandidateCard.js y StageColumn.js
4. Escribir test en cypress/e2e/position_spec.cy.js
```

**Paso 3 - Ejecutar:**
```bash
cd frontend
npm install --save-dev cypress @4tw/cypress-drag-drop
# ... configurar y escribir tests
```

**Paso 4 - Actualizar Memory Bank:**
```markdown
# activeContext.md (actualizado)
- [x] Instalar Cypress y plugin de Drag & Drop
- [x] Configurar cypress.config.js
- [ ] Escribir spec de Position Details (en progreso)
```

---

## ⚠️ ADVERTENCIA FINAL

Si ignoras el Memory Bank y trabajas "a ciegas":
- Puedes romper patrones existentes (ej: cambiar `react-beautiful-dnd` por otra librería)
- Puedes duplicar trabajo (ej: reinstalar dependencias ya instaladas)
- Puedes crear tests que NO funcionan (ej: olvidar plugin de Drag & Drop)

**El Memory Bank ES tu compañero de equipo.** Úsalo.
