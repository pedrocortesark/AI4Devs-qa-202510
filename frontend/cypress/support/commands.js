// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Custom command to wait for API call completion
Cypress.Commands.add('waitForApi', (alias) => {
  cy.wait(alias, { timeout: 10000 });
});
