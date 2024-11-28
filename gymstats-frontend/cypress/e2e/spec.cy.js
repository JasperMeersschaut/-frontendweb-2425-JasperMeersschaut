describe('...', () => {
  beforeEach(() => {
    cy.login('meersschaut.jasper@gmail.com', '12345678');
  });
  
  describe('General', () => {
    it('draait de applicatie', () => {
      cy.visit('http://localhost:5173');
      cy.get('h1').should('exist');
    });
  
    it('Profiel laadt',()=>{
      cy.get('[data-cy=profile_btn]').click();
      cy.get('h3').should('exist').contains('Jasper');
    });
  });
});