describe('User Registration and Login', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:9000/api/users/me', { fixture: 'user.json' }).as('getUser');
  });
  
  it('Signs up and then signs in', () => {
    // Sign up
    cy.visit('http://localhost:5173/register');
    cy.get('[data-cy=name_input]').type('Test');
    cy.get('[data-cy=lastName_input]').type('Testens');
    cy.get('[data-cy=email_input]').type('test.testens@gmail.com');
    cy.get('[data-cy=sex_input]').type('Male');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=confirmPassword_input]').type('12345678');
    cy.get('[data-cy=birthdate_input]').type('2005-01-16');
    cy.get('[data-cy=length_input]').type('177');
    cy.get('[data-cy=weight_input]').type('73');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_btn]').click();
  
    cy.wait('@getUser');
  
    // Sign in
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('test.testens@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=submit_btn]').click();
  
    // Verify that the user is redirected to the home page
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('test.testens@gmail.com').should('be.visible');
  });
});