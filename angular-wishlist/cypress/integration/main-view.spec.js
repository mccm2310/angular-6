describe('ventana principal', () => {
    it('tiene encabezado correcto y en español por defecto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Lista de Deseos');
        cy.get('h1').should('contain', 'Hola');
    });
    it('cambiando idioma a Francés', () => {
        cy.get('.header-flags > a').last().click();
        cy.get('h1').should('contain', 'Salut');
    })
    it('guardando un nuevo destino', () => {      
        cy.get('#nombre').type('Prueba');
        cy.get('#saveLocation').click();
        expect(cy.get('#destino-Prueba')).to.exist;
    })
    it('eliminar nuevo destino', () => {
        cy.get('#destino-madrid').find('h5').click();
        expect('#destino-madrid').assert.notExists;       
    })
  }); 