// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Example custom command for dragging candidate to stage
Cypress.Commands.add('dragCandidateToStage', (candidateId, stageIndex) => {
  cy.get(`[data-testid="candidate-card-${candidateId}"]`)
    .drag(`[data-testid="stage-column-${stageIndex}"]`);
});

// Custom command to wait for API call completion
Cypress.Commands.add('waitForApi', (alias) => {
  cy.wait(alias);
});
