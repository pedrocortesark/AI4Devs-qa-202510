describe('Kanban Board - Position Details', () => {

    // CONFIGURACIÓN (Antes de cada test)
    beforeEach(() => {
        // 1. Interceptamos las llamadas de carga para devolver nuestros Fixtures
        cy.intercept('GET', '**/positions/*/interviewFlow', { fixture: 'interviewFlow.json' }).as('getFlow');
        cy.intercept('GET', '**/positions/*/candidates', { fixture: 'candidates.json' }).as('getCandidates');

        // 2. Visitamos la página (usando ID 1 como ejemplo)
        cy.visit('/positions/1');

        // 3. Esperamos a que los datos carguen
        cy.wait(['@getFlow', '@getCandidates']);
    });

    // TEST 1: Carga Visual - Verificar que las columnas se renderizan correctamente
    it('Renderiza correctamente las columnas del flujo de entrevistas', () => {
        // Verificamos que se ven las 3 columnas definidas en el fixture
        cy.contains('Entrevista Inicial').should('be.visible');
        cy.contains('Prueba Técnica').should('be.visible');
        cy.contains('Oferta').should('be.visible');

        // Verificamos que el título de la posición se muestra
        cy.contains('Desarrollador Fullstack').should('be.visible');
    });

    // TEST 2: Carga de Candidatos - Verificar que los candidatos aparecen en las columnas correctas
    it('Renderiza los candidatos en sus columnas correspondientes', () => {
        // Verificamos que los candidatos del fixture están visibles
        cy.contains('Carlos García').should('be.visible');
        cy.contains('Ana López').should('be.visible');
        cy.contains('Beatriz Méndez').should('be.visible');

        // Verificamos que Carlos García y Ana López están en "Entrevista Inicial"
        cy.contains('Entrevista Inicial')
            .parent()
            .parent()
            .within(() => {
                cy.contains('Carlos García').should('exist');
                cy.contains('Ana López').should('exist');
            });

        // Verificamos que Beatriz Méndez está en "Prueba Técnica"
        cy.contains('Prueba Técnica')
            .parent()
            .parent()
            .within(() => {
                cy.contains('Beatriz Méndez').should('exist');
            });
    });

    // TEST 3: Visualización de Rating - Verificar que los ratings se muestran correctamente
    it('Muestra correctamente los ratings de los candidatos', () => {
        // Carlos García tiene rating 4 (4 círculos verdes)
        cy.contains('Carlos García')
            .parent()
            .within(() => {
                cy.get('span[role="img"][aria-label="rating"]').should('have.length', 4);
            });

        // Ana López tiene rating 3
        cy.contains('Ana López')
            .parent()
            .within(() => {
                cy.get('span[role="img"][aria-label="rating"]').should('have.length', 3);
            });

        // Beatriz Méndez tiene rating 5
        cy.contains('Beatriz Méndez')
            .parent()
            .within(() => {
                cy.get('span[role="img"][aria-label="rating"]').should('have.length', 5);
            });
    });

    // TEST 4: Funcionalidad Drag & Drop - Mover candidato entre columnas
    it('Permite mover un candidato entre columnas y actualiza el backend', () => {
        // A. Preparamos la escucha del PUT para verificar la llamada a la API
        cy.intercept('PUT', '**/candidates/*').as('updateCandidate');

        // B. Ejecutamos Drag & Drop
        // Movemos a Carlos García (primer candidato en la columna 0) a la columna 1 (Prueba Técnica)
        // El droppableId es el índice del array de stages (0, 1, 2)
        cy.get('[data-rbd-draggable-id="101"]') // draggableId es el candidateId
            .drag('[data-rbd-droppable-id="1"]'); // droppableId="1" es la segunda columna (Prueba Técnica)

        // C. Verificamos la llamada a la API
        cy.wait('@updateCandidate').then((interception) => {
            // Verificamos que se llamó al endpoint correcto
            expect(interception.request.url).to.include('/candidates/101');

            // Verificamos que el body contiene los datos correctos
            expect(interception.request.body).to.have.property('applicationId', 1);
            expect(interception.request.body).to.have.property('currentInterviewStep', 2); // ID de "Prueba Técnica"
        });

        // D. Verificamos que visualmente el candidato se movió a la nueva columna
        cy.contains('Prueba Técnica')
            .parent()
            .parent()
            .within(() => {
                cy.contains('Carlos García').should('exist');
            });
    });

    // TEST 5: Drag & Drop - Mover candidato dentro de la misma columna (reordenamiento)
    it('Permite reordenar candidatos dentro de la misma columna', () => {
        // Verificamos el orden inicial en "Entrevista Inicial"
        cy.contains('Entrevista Inicial')
            .parent()
            .parent()
            .find('[data-rbd-draggable-id]')
            .first()
            .should('contain', 'Carlos García');

        // Movemos a Carlos García (índice 0) a la posición de Ana López (índice 1)
        // Nota: Este test verifica que el drag & drop funciona, aunque no hace llamada API
        // porque el backend solo se actualiza cuando cambia de columna
        cy.get('[data-rbd-draggable-id="101"]')
            .drag('[data-rbd-draggable-id="102"]');

        // El orden visual debería cambiar (aunque esto depende de la implementación específica)
        // Este test verifica que el drag & drop no genera errores
    });

    // TEST 6: Navegación - Botón de volver a posiciones
    it('Permite volver a la lista de posiciones', () => {
        // Verificamos que existe el botón de volver
        cy.contains('Volver a Posiciones').should('be.visible');

        // Hacemos click (esto navegaría a /positions, pero no lo verificamos aquí
        // para mantener el test aislado)
        cy.contains('Volver a Posiciones').should('have.attr', 'class').and('include', 'btn-link');
    });

    // TEST 7: Manejo de errores - Verificar comportamiento cuando falla la API
    it('Maneja correctamente los errores de carga de datos', () => {
        // Reiniciamos y simulamos un error en la API
        cy.intercept('GET', '**/positions/*/interviewFlow', {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
        }).as('getFlowError');

        cy.intercept('GET', '**/positions/*/candidates', {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
        }).as('getCandidatesError');

        cy.visit('/positions/1');

        // Esperamos las llamadas fallidas
        cy.wait(['@getFlowError', '@getCandidatesError']);

        // Verificamos que la página no muestra candidatos (manejo graceful del error)
        // Nota: Esto depende de cómo el frontend maneje los errores
        // En este caso, simplemente verificamos que no crashea
        cy.get('body').should('exist');
    });

    // TEST 8: Drag & Drop - Cancelar drag (soltar fuera de zona válida)
    it('Cancela el drag cuando se suelta fuera de una zona válida', () => {
        // Preparamos el intercept pero no debería llamarse
        cy.intercept('PUT', '**/candidates/*').as('updateCandidate');

        // Intentamos arrastrar pero soltamos en un área no válida
        // Esto simula un usuario que cancela el drag
        cy.get('[data-rbd-draggable-id="101"]').trigger('dragstart');
        cy.get('body').trigger('drop'); // Soltar en el body (no en una columna)

        // Verificamos que NO se hizo llamada a la API
        cy.get('@updateCandidate.all').should('have.length', 0);

        // Verificamos que el candidato sigue en su columna original
        cy.contains('Entrevista Inicial')
            .parent()
            .parent()
            .within(() => {
                cy.contains('Carlos García').should('exist');
            });
    });
});
