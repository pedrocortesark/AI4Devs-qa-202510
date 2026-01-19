# REGISTRO DE PROMPTS UTILIZADOS
**Autor**: pedrocortes
**Proyecto**: 11-e2e-testing - Sistema de Gestión de Candidatos LTI
**Descripción**: Bitácora de prompts para trazabilidad del proyecto.
---

## 001 - Creación de Memory Bank y Reglas de Agente para Testing E2E
**Fecha:** 2026-01-19
**Prompt Original:**
# Contexto / Rol
Eres una instancia experta de **Gemini 3** operando como "Agente Arquitecto & QA Lead" dentro de **VSCode**.
Estamos trabajando en un proyecto existente (Interfaz "Position" / Tablero Kanban) y estamos a punto de integrar pruebas E2E. Tu responsabilidad es crear el **"Banco de Memoria" (Memory Bank)** para asegurar que el contexto de la aplicación y la nueva capa de testing convivan sin fricción.

# Objetivo
Generar la estructura de archivos de documentación y las **Reglas de Agente (.agent/rules)** para obligar a cualquier instancia de Gemini a leer el contexto antes de trabajar.

## 0. Prerrequisito: Inicialización de Protocolo (AGENTS.md)
**CRÍTICO: ANTES DE REALIZAR CUALQUIER OTRA OPERACIÓN O ESCANEO.**
1.  Busca y lee atentamente el archivo `AGENTS.md` en la raíz (si no existe, asume los principios de memoria persistente descritos abajo).
2.  Inicializa y adopta estrictamente el protocolo de gestión de contexto.
3.  Solo procede con la creación del Memory Bank (pasos siguientes) una vez que hayas asimilado dicho protocolo maestro.

## 1. Estructura de Archivos a Generar
Analiza el repositorio (`@workspace`) y genera el contenido para estos archivos dentro de la carpeta `/memory-bank/`. Si no puedes crearlos directamente, dame el código Markdown de cada uno:

`/memory-bank/`
  `projectbrief.md`      (Resumen: Interfaz de gestión de candidatos "Position" tipo Kanban)
  `productContext.md`    (Flujos de usuario: Mover candidatos entre columnas, llamadas API)
  `systemPatterns.md`    (Arquitectura actual del Frontend + Patrones de Testing que vamos a adoptar)
  `techContext.md`       (Stack actual + Configuración de Cypress y Plugins detectados)
  `activeContext.md`     (El estado actual "en vivo": Implementación de Cypress)
  `progress.md`          (Historial y hitos pendientes)

`/.agent/rules/`
  `00-memory-bank.md`    (Regla maestra de lectura obligatoria)

## 2. Definición del Contenido (Archivos Core)

### `memory-bank/projectbrief.md`
- Analiza el código actual para describir qué hace la vista "Position".
- Objetivo actual: Asegurar la calidad mediante E2E Testing.

### `memory-bank/activeContext.md`
- **ESTADO ACTUAL:** Fase de configuración de QA.
- **TAREA ACTIVA:** Configuración de Cypress e implementación de `position_spec.cy.js`.
- **PRÓXIMOS PASOS:** Instalar dependencias, configurar plugin de Drag&Drop, escribir primer test.

### `memory-bank/techContext.md`
- **Detecta y registra:**
    1. El Framework Frontend (React, Vue, Svelte, etc.).
    2. La librería de Drag & Drop utilizada (búscala en `package.json` o importaciones).
    3. Comandos de script para arrancar el proyecto y los tests.

## 3. Configuración de la Regla (.agent/rules)

Genera el archivo **`.agent/rules/00-memory-bank.md`** con el siguiente contenido EXACTO:

"""markdown
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
- `memory-bank/activeContext.md` -> Para entender el enfoque actual (QA/Cypress).
- `memory-bank/systemPatterns.md` -> Para respetar la arquitectura y selectores.
- `memory-bank/techContext.md` -> Para usar los comandos y librerías correctas (Drag&Drop, etc).

## 2. Actualizaciones Atómicas (ESCRIBIR AL FINALIZAR)
Después de completar una tarea:
1.  **Actualizar** `memory-bank/activeContext.md`: Elimina tu tarea finalizada, añade el resultado.
2.  **Actualizar** `memory-bank/progress.md`: Marca las funcionalidades como completadas.
3.  **Autocorrección**: Si encuentras que `projectbrief.md` o `systemPatterns.md` están desactualizados, actualízalos inmediatamente.

## 3. Acciones Prohibidas
- No inventes comandos que no aparezcan en `techContext.md`.
- No modifiques la arquitectura central sin actualizar primero `systemPatterns.md`.
"""

## 4. Procedimiento de Inicialización
1.  **Ejecuta la lectura de `AGENTS.md` e inicia el protocolo (Paso 0).**
2.  Ejecuta un escaneo profundo del repositorio para entender la vista "Position".
3.  Redacta el contenido de todos los archivos de `/memory-bank/` basándote en el código existente y el objetivo de Cypress.
4.  Crea la carpeta `.agent/rules/` y el archivo de reglas.
5.  Confírmame cuando el "Cerebro del Proyecto" esté activo y listo para la tarea de Cypress.

**Resumen de la Respuesta/Acción:**
Inicialización del protocolo, escaneo del proyecto Kanban y generación del Memory Bank enfocado en la fase de Testing E2E + regla maestra.

---

## 002 - Inicialización Memory Bank (Contexto Cypress/Kanban)
**Fecha:** 2026-01-19
# Contexto / Rol
# Tarea: Instalación y Configuración Base de Cypress (Proyecto Position)

Actúa como QA Lead. Vamos a ejecutar el primer paso de la fase de Testing definida en nuestro `progress.md`.

**CONTEXTO TÉCNICO:**
- **Ubicación actual:** Raíz del repositorio.
- **Target:** Carpeta `/frontend`.
- **Lenguaje:** JavaScript (.js).
- **Frontend Port:** 3000 (BaseUrl).
- **Backend Port:** 3010.

**OBJETIVO:**
Dejar el entorno de Cypress listo para escribir pruebas, incluyendo el soporte para Drag & Drop.

**PASOS A EJECUTAR:**

1.  **Instalación de Dependencias (en `/frontend`):**
    - Entra en la carpeta `frontend`.
    - Instala las siguientes devDependencies:
      - `cypress`
      - `@4tw/cypress-drag-drop` (Crítico para probar el Kanban).

2.  **Scaffolding y Configuración (`cypress.config.js`):**
    - Si Cypress no ha creado su estructura, inicialízala o crea manualmente el archivo `frontend/cypress.config.js`.
    - Configura el objeto `e2e` con:
      - `baseUrl: 'http://localhost:3000'`
      - `viewportWidth: 1280` (Para asegurar que el Kanban se ve bien).
      - `viewportHeight: 720`.
    - *Nota:* No uses TypeScript para la configuración, mantente en JS.

3.  **Integración del Plugin:**
    - Modifica el archivo `frontend/cypress/support/e2e.js` (o créalo si no existe).
    - Añade la línea: `require('@4tw/cypress-drag-drop')`.

4.  **Scripts de Ejecución:**
    - Abre `frontend/package.json` y añade estos scripts si no existen:
      - `"cy:open": "cypress open"`
      - `"cy:run": "cypress run"`

5.  **Actualización de Memoria (Protocolo Obligatorio):**
    - Edita `memory-bank/techContext.md`: Añade Cypress y el plugin a la lista de tecnologías.
    - Edita `memory-bank/activeContext.md`:
      - Marca "Instalación de Cypress" y "Configuración Base" como COMPLETADO.
      - Establece "Preparación de Fixtures" como la nueva Tarea Activa.
    - Edita `memory-bank/progress.md`: Marca las casillas correspondientes en la sección "Fase Actual".

**VERIFICACIÓN FINAL:**
Confírmame que has creado el archivo de configuración y que el plugin está importado correctamente antes de terminar.

**Resumen de la Respuesta/Acción:**
Instalados Cyress y dependencias para Drag & Drop. Configurado archivo de configuración y plugin importado correctamente. 
---

## 003 - Generación de Fixtures Cypress
**Fecha:** 2026-01-19
**Prompt Original:**
# Tarea: Generación de Fixtures para Cypress (Datos de Prueba)

Actúa como QA Lead y Desarrollador Fullstack. Vamos a crear los datos estáticos (Mock Data) necesarios para que nuestros tests sean deterministas y no dependan de la base de datos en tiempo real.

**CONTEXTO:**
Estamos en la fase de "Preparación de Fixtures" definida en el roadmap. Necesitamos simular las respuestas de la API para la vista "Position Details" (Kanban).

**ARCHIVOS A ANALIZAR (Para inferir la estructura JSON):**
1.  Revisa `backend/prisma/schema.prisma` O BIEN los tipos en `frontend/src` (si existen) para entender la estructura exacta de:
    - `InterviewFlow` / `InterviewStep` (Columnas del tablero).
    - `Candidate` (Tarjetas).

**PASOS A EJECUTAR:**

1.  **Crear Fixture de Flujo (`frontend/cypress/fixtures/interviewFlow.json`):**
    - Genera un JSON que simule la respuesta de `GET /positions/1/interviewFlow`.
    - Debe contener al menos 3 pasos (ej: "Entrevista Inicial", "Prueba Técnica", "Oferta").
    - Asegúrate de incluir los campos obligatorios que usa el frontend (probablemente `id`, `name` o `description`, y `orderIndex`).

2.  **Crear Fixture de Candidatos (`frontend/cypress/fixtures/candidates.json`):**
    - Genera un JSON que simule la respuesta de `GET /positions/1/candidates`.
    - Crea 3 candidatos:
      - Candidato A: En el paso 1 (Entrevista Inicial).
      - Candidato B: En el paso 1 (Para probar el ordenamiento visual).
      - Candidato C: En el paso 2 (Prueba Técnica).
    - **CRÍTICO:** Los IDs de `currentInterviewStep` (o como se llame el campo de relación) DEBEN coincidir con los IDs que definiste en `interviewFlow.json`.

3.  **Actualización de Memoria (Protocolo Obligatorio):**
    - Edita `memory-bank/activeContext.md`:
      - Marca "Preparación de Fixtures" como COMPLETADO.
      - Establece "Escritura de Tests (Spec 1, 2 y 3)" como la nueva Tarea Activa.
      - Añade una nota sobre qué archivos JSON se han creado.
    - Edita `memory-bank/progress.md`: Marca el checkbox de "Preparación de Fixtures".

**VERIFICACIÓN:**
Antes de confirmar, verifica que los keys del JSON (ej: `fullName` vs `name`, `id` vs `_id`) coincidan con lo que el componente React `PositionDetails` espera renderizar.

**Resumen de la Respuesta/Acción:**
Analizado código frontend `PositionDetails.js` para inferir estructura de datos. Creados `interviewFlow.json` y `candidates.json` con datos mock coherentes con la lógica de filtrado del frontend (usando Nombres de steps en lugar de IDs para la propiedad `currentInterviewStep` como espera el frontend). Documentación actualizada.
---

## 004 - Verificación de Entorno (Smoke Test)
**Fecha:** 2026-01-19
**Prompt Original:**
# Tarea: Verificación de Entorno (Smoke Test)

Actúa como QA Lead. Antes de escribir los tests complejos, necesito verificar que la instalación y configuración de Cypress son correctas.

**OBJETIVO:**
Crear y ejecutar una prueba de conexión básica ("Sanity Check") para confirmar que Cypress puede levantar el navegador y cargar el proyecto correctamente.

**PASOS A EJECUTAR:**

1.  **Asegurar que el servidor Frontend está corriendo:**
    - Verifica si el puerto 3000 está activo. Si no, indícame que debo iniciar el proyecto frontend en una terminal aparte (`npm start`).

2.  **Crear un Test de Verificación (`frontend/cypress/e2e/sanity.cy.js`):**
    - Crea este archivo con un test muy simple:
      ```javascript
      describe('Verificación de Entorno', () => {
        it('Carga la página de inicio correctamente', () => {
          cy.visit('/'); // Esto verifica que baseUrl está bien configurada
          cy.get('body').should('be.visible'); // Verifica que el DOM carga
        });
        
        it('Puede leer los fixtures creados', () => {
          cy.fixture('interviewFlow').then((data) => {
            expect(data).to.not.be.undefined;
          });
          cy.fixture('candidates').then((data) => {
             expect(data).to.not.be.undefined;
          });
        });
      });
      ```

3.  **Instrucciones de Ejecución:**
    - Dame el comando exacto para abrir Cypress en modo gráfico (`npx cypress open`) desde la carpeta correcta.
    - Explícame qué debo ver en la pantalla para considerar que la prueba ha sido exitosa.

**NOTA:** No actualices el Memory Bank todavía. Este es un paso de verificación intermedio. Sin embargo, sí que quiero que incluyas este prompt en el registro siguiendo el protocolo AGENTSmd

**Resumen de la Respuesta/Acción:**
Verificado que el servidor frontend no está corriendo en el puerto 3000. Creado archivo de test de verificación `frontend/cypress/e2e/sanity.cy.js` con dos tests: uno para verificar la carga de la página y otro para verificar el acceso a los fixtures. Documentación actualizada en `prompts-log.md`.
---
