describe('Change Password', () => {
  const email = 'testuser@ntu.edu.tw';
  const password = 'Password123!';
  const name = 'Test User';

  beforeEach(() => {
    cy.loginWithRegistration(email, password, name);
    cy.viewport('macbook-13');
    cy.url().should('include', '/');
    cy.contains('Logout').should('be.visible');
    // Visit the password change page
    cy.visit('http://localhost:3000/change-password');
  });

  it('should change password and submit', () => {
    // Change password
    cy.get('form[name="pwd"] input[name="oldpassword"]').type('Password123!');
    cy.get('form[name="pwd"] input[name="newpassword"]').type('NewPassword123!');
    cy.get('form[name="pwd"] input[name="confirmpassword"]').type('NewPassword123!');

    // Submit the form
    cy.get('form[name="pwd"]').submit();

    // Check for success message or updated UI
    cy.contains('Password changed successfully').should('be.visible');
  });
  
it('should show error for invalid old password', () => {
  // Provide an incorrect old password
  cy.get('form[name="pwd"] input[name="oldpassword"]').type('IncorrectOldPassword');
  cy.get('form[name="pwd"] input[name="newpassword"]').type('NewPassword123!');
  cy.get('form[name="pwd"] input[name="confirmpassword"]').type('NewPassword123!');

  // Submit the form
  cy.get('form[name="pwd"]').submit();

  // Check for error message or any indication of failure
  cy.contains('Incorrect old password').should('be.visible');
});
   
  
});