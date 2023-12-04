describe('Deltete Item Test', () => {
  const email = 'test@ntu.edu.tw';
  const password = 'test123';
  const name = 'test user';

  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.loginWithRegistration(email, password, name);
    cy.url().should('include', '/');
    cy.contains('Logout').should('be.visible');
    cy.visit('http://localhost:3000/profile');
	cy.get('button[name="upload item"]').contains('Uploaded Items').click();
	cy.get('.item-list').should('exist');
  });
  
  it('should navigate to update item page when edit button is clicked', () => {
    // Assuming there is at least one item on the page
    cy.get('.item-container').first().within(() => {
      cy.get('.edit').click();
    });

    // Verify that the URL has changed to the updateItem page
    cy.url().should('include', '/updateItem');
  });

  it('should delete an item when delete button is clicked', () => {
    cy.get('.item-container').first().within(() => {
      cy.get('.edit').click();
    });
    // Verify that the URL has changed to the updateItem page
    cy.url().should('include', '/updateItem');
    // Assuming there is at least one item on the page
    cy.get('.delete-button').click();


    // You can also assert that the succeedMsg modal appears
    cy.get('.modal h2').should('contain', 'Successfully delete item');
  });


});
