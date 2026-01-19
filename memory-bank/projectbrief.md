# Project Brief - LTI Talent Tracking System

## Descripción General
**LTI - Talent Tracking System** es una aplicación full-stack para gestión de procesos de reclutamiento. Permite a reclutadores administrar candidatos y posiciones abiertas mediante una interfaz Kanban que refleja el flujo de entrevistas (Interview Flow).

## Objetivo del Proyecto
Crear un sistema integral que permita:
1. **Añadir candidatos** con educación, experiencia laboral y CVs
2. **Gestionar posiciones abiertas** con flujos de entrevista configurables
3. **Visualizar candidatos en un tablero Kanban** organizado por etapas de entrevista (Initial Screening, Technical Interview, Manager Interview, etc.)
4. **Mover candidatos entre etapas** mediante Drag & Drop
5. **Ver detalles de candidatos** en un panel lateral (Offcanvas)

## Alcance Actual - Fase de Integración de Testing E2E
**Estado:** El proyecto está en producción (funcionalidades core implementadas).  
**Nuevo Objetivo:** Asegurar la calidad mediante **Testing End-to-End (E2E)** con Cypress.

### Funcionalidades a Validar con E2E:
- ✅ Dashboard del reclutador (navegación a Posiciones y Añadir Candidato)
- ✅ Listado de posiciones con filtros (título, fecha, estado, manager)
- ✅ Detalles de posición con tablero Kanban
- ✅ Drag & Drop de candidatos entre columnas (InterviewStep)
- ✅ Panel lateral con detalles del candidato (al hacer clic en tarjeta)
- ✅ Actualización en backend al mover candidato (PUT `/candidates/:id`)

## Stakeholders
- **Usuario Final:** Reclutadores y Hiring Managers de LTI
- **QA Lead:** Responsable de integrar Cypress y escribir tests E2E
- **DevOps:** Configuración de CI/CD para tests automatizados (futuro)

## Métricas de Éxito (Testing)
1. **Cobertura E2E:** Al menos 80% de los flujos críticos (Kanban Drag&Drop, navegación, formularios)
2. **Tiempo de ejecución:** Suite de tests < 3 minutos
3. **Estabilidad:** 0 tests flaky (intermitentes) en ambiente controlado
