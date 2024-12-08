describe('Exercise Management', () => {
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
      cy.get('body').click(0, 0);
      cy.get('[data-cy=submit_exercise]').click(); 

      cy.get('[data-cy=exercise_list]').should('contain', 'AAA_TEST');
    });

    it('Deletes Exercise', () => {
      cy.get('[data-cy=exercises_btn]').click();
    
      cy.get('[data-cy=exercise_list]')
        .contains('[data-cy^=exercise_card_]', 'AAA_TEST')
        .within(() => {
          cy.get('[data-cy=exercise_remove_btn]').click();
        });
    
      cy.get('[data-cy=exercise_list]').should('not.contain', 'AAA_TEST');
    });

    it('should show the error message for an invalid type', () => {
      cy.get('[data-cy=exercises_btn]').click();
      cy.get('[data-cy=create_exercises_btn]').click();
      cy.url().should('include', '/exercises/add');
  
      cy.get('[data-cy=muscle_group_input]').select(1); 
      cy.get('[data-cy=description_input]').type('Lorem Ipsum'); 
      cy.get('[data-cy=submit_exercise]').click();
  
      cy.get('[data-cy=label_input_error]').contains('Type is required');
    });
  
    it('should show error message for an invalid description', () => {  
      cy.get('[data-cy=exercises_btn]').click();
      cy.get('[data-cy=create_exercises_btn]').click();
      cy.url().should('include', '/exercises/add');

      cy.get('[data-cy=muscle_group_input]').select(1); 
      cy.get('[data-cy=type_input]').type('Lorem Ipsum'); 
      cy.get('[data-cy=submit_exercise]').click();

      cy.get('[data-cy=label_input_error]').contains('Description is required');
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