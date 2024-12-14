describe('User Registration, Profile Check, Logout, Login, and User Removal', () => {
  it('Signs up, checks profile, logs out, logs in, and removes the new user', () => {
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

    // Wait for the sign-up process to complete
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy=profile_btn]').click();
    cy.url().should('eq', 'http://localhost:5173/profile');
    cy.contains('test.testens@gmail.com').should('be.visible');

    // Log out
    cy.get('[data-cy=logout_btn]').click();

    // Log in with existing user
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('meersschaut.jasper@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678'); // Replace with the actual password
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_btn]').click();

    // Wait for login to complete
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('[data-cy=profile_btn]').click();
    cy.url().should('eq', 'http://localhost:5173/profile');

    // Click button to go to user configuration page
    cy.get('[data-cy=user_configuration_btn]').click();

    // Remove the newly created user
    cy.get('[data-cy=users_list]')
      .contains('[data-cy^=user_card_]', 'test.testens@gmail.com')
      .within(() => {
        cy.get('[data-cy^=user_remove_btn]').click();
      });

    // Confirm the user is removed
    cy.get('[data-cy=users_list]').should('not.contain', 'test.testens@gmail.com');
  });
  it('Shows error when name is missing', () => {
    cy.visit('http://localhost:5173/register');
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
    cy.contains('Name is required').should('be.visible');
  });

  it('Shows error when email is missing', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('[data-cy=name_input]').type('Test');
    cy.get('[data-cy=lastName_input]').type('Testens');
    cy.get('[data-cy=sex_input]').type('Male');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=confirmPassword_input]').type('12345678');
    cy.get('[data-cy=birthdate_input]').type('2005-01-16');
    cy.get('[data-cy=length_input]').type('177');
    cy.get('[data-cy=weight_input]').type('73');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_btn]').click();
    cy.contains('Email is required').should('be.visible');
  });

  it('Shows error when password is missing', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('[data-cy=name_input]').type('Test');
    cy.get('[data-cy=lastName_input]').type('Testens');
    cy.get('[data-cy=email_input]').type('test.testens@gmail.com');
    cy.get('[data-cy=sex_input]').type('Male');
    cy.get('[data-cy=birthdate_input]').type('2005-01-16');
    cy.get('[data-cy=length_input]').type('177');
    cy.get('[data-cy=weight_input]').type('73');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_btn]').click();
    cy.contains('Password is required').should('be.visible');
  });
});