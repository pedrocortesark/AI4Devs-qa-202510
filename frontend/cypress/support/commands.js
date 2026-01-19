// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Example custom command for dragging candidate to stage
Cypress.Commands.add('dragCandidateToStage', (candidateId, stageId) => {
  cy.get(`[data-testid="candidate-card-${candidateId}"]`)
    .drag(`[data-testid="kanban-column-${stageId}"] .card-body`, { force: true });
});

// Custom command to wait for API call completion
Cypress.Commands.add('waitForApi', (alias) => {
  cy.wait(alias, { timeout: 10000 });
});
