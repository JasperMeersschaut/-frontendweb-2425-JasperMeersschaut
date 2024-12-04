describe('...', () => {
  beforeEach(() => {
    cy.login('meersschaut.jasper@gmail.com', '12345678');
  });

  describe('General', () => {
    it('Makes Exercise', () => {
      cy.get('[data-cy=exercises_btn]').click();
      cy.get('[data-cy=create_exercises_btn]').click();
      cy.url().should('include', '/exercises/add');
      
      cy.get('[data-cy=type_input]').type('AAA_TEST'); 
      cy.get('[data-cy=muscle_group_input]').select(1); 
      cy.get('[data-cy=description_input]').type('Lorem Ipsum'); 
      cy.get('[data-cy=submit_exercise]').click(); 
    });

    it('Deletes Exercise', () => {
      cy.get('[data-cy=profile_btn]').click();
      cy.get('h3').should('exist').contains('Jasper');
    });

    it('should show a loading indicator for a very slow response', () => {
      cy.intercept(
        'http://localhost:9000/api/exercises', 
        (req) => {
          req.on('response', (res) => {
            res.setDelay(1000);
          });
        },
      ).as('slowResponse');
      cy.visit('localhost:5173/exercises'); 
      cy.get('[data-cy=loader]').should('be.visible'); 
      cy.wait('@slowResponse');
      cy.get('[data-cy=loader]').should('not.exist'); 
    });
  });
});