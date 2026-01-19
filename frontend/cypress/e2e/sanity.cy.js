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
