describe('UploadItems', () => {
  const email = 'testuser@ntu.edu.tw';
  const password = 'Password123!';
  const name = 'Test User';

  beforeEach(() => {
      cy.viewport('macbook-13');
      cy.loginWithRegistration(email, password, name);
      cy.url().should('include', '/');
      cy.contains('Logout').should('be.visible');
      cy.visit('http://localhost:3000/uploaditems');
  });

  it('should show an error if the name is empty', () => {
    cy.get('input[name="name"]').clear(); // Clear the name field
    cy.get('form').submit();
    cy.contains('Name cannot be empty').should('be.visible'); // Adjust this to the actual error message your app shows
  });

  it('should upload items.', () => {
      // Mock the geolocation
      cy.window().then((win) => {
          cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
              return cb({ coords: { latitude: 35.6895, longitude: 139.6917 }});
          });
      });

      // Upload multiple images
      const imageFixturePath = 'path/to/your/image.jpg'; // Replace with your image path
      // cy.get('input[type="file"]').attachFile(imageFixturePath);
      // cy.get('input[type="file"]').attachFile(imageFixturePath);

      // Fill in the other form fields
      cy.get('input[name="name"]').type('Test Item Name');
      cy.get('input[name="quantity"]').type('5');
      cy.get('input[name="endTime"]').type('2022-12-31T23:59'); // Use an appropriate date-time format
      cy.get('input[name="location"]').type('Test Location');
      cy.get('form').submit();
      cy.contains('Successfully uploaded item').should('be.visible');
  });
});
