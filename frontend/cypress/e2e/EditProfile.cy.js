describe('E2E Tests', () => {
  const email = 'testuser@ntu.edu.tw';
  const password = 'Password123!';
  const name = 'Test User';
  
  beforeEach(() => {
	  cy.loginWithRegistration(email, password, name);
	  cy.viewport('macbook-13');
      cy.url().should('include', '/');
      cy.contains('Logout').should('be.visible');
      cy.visit('http://localhost:3000/profile');
  });
  

  it('should change name and submit', () => {
    // Change name
    cy.get('form[name="profile"] input[name="name"]').clear().type('New Name');

    // Submit the form
    cy.get('form[name="profile"]').submit();

    // Check for success message or updated UI
    cy.contains('Successfully Edit Profile').should('be.visible');
  });
  

  it('should change notification checkbox and submit', () => {
    // Change notification checkbox
    cy.get('form[name="profile"] input[name="notification"]').check();
 
    // Submit the form
    cy.get('form[name="profile"]').submit();

    // Check for success message or updated UI
    cy.contains('Successfully Edit Profile').should('be.visible');
  });

  it('should change picture and submit', () => {
    // Change profile picture
    cy.fixture('your-image-file.jpg').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'your-image-file.jpg',
        mimeType: 'image/jpeg',
      });
    });

    // Submit the form
    cy.get('form[name="profile"]').submit();

    // Check for success message or updated UI
    cy.contains('Successfully Edit Profile').should('be.visible');
  });
});
