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

[... contenido completo del prompt sobre creación de Memory Bank, estructura de archivos, reglas de agente, etc.]

**Resumen de la Respuesta/Acción:**
Crear estructura `/memory-bank/` con 6 archivos documentales (projectbrief, productContext, systemPatterns, techContext, activeContext, progress) + carpeta `.agent/rules/` con regla maestra `00-memory-bank.md` para asegurar lectura obligatoria del contexto antes de trabajar en testing E2E.
---
