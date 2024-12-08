describe('Exercise Filtering', () => {
  beforeEach(() => {
    cy.login('meersschaut.jasper@gmail.com', '12345678');
  });
  
  it('Filters to arms only', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/exercises',
      { fixture: 'exercises.json' }, 
    );
    cy.visit('http://localhost:5173');
    cy.get('[data-cy=exercises_btn]').click();
    cy.url().should('include', '/exercises');
      
    cy.contains('[data-cy=muscle_group_label]', 'Arms').click();
    cy.get('[data-cy^=exercise_card_]').should('have.length', 8);
    cy.get('[data-cy=exercise_list]').within(() => {
      cy.get('[data-cy=exercise_muscle_group]').each((titel) => {
        cy.wrap(titel).should('contain', 'Arms');
      });
      cy.get('[data-cy=exercise_muscle_group]').should('not.contain', 'Legs');
    });
  });
});