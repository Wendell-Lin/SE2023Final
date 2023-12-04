describe('View the uploaded item list Test', () => {
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
    // Assuming there is at least one item on the page
    cy.get('.item-container').first().within(() => {
      cy.get('.edit').click();
    });
    cy.url().should('include', '/updateItem');
  });
  
});

describe('Edit Items Test', () => {
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
    // Assuming there is at least one item on the page
    cy.get('.item-container').first().within(() => {
      cy.get('.edit').click();
    });
    cy.url().should('include', '/updateItem');
  });
  
   it('should update item name', () => {
    const newName = 'Updated Item Name';
    cy.get('#name').clear().type(newName);
    cy.get('[name="update"]').click();
    cy.get('.modal h2').should('contain', 'Successfully update item');
    
  });

  it('should update item category', () => {
    const newCategory = 'Snack';
    cy.get('#category').select(newCategory);
    cy.get('[name="update"]').click();
    cy.get('.modal h2').should('contain', 'Successfully update item');
    
  });

  it('should update item amount', () => {
    const newAmount = '2';
    cy.get('#amount').clear().type(newAmount);
    cy.get('[name="update"]').click();
    cy.get('.modal h2').should('contain', 'Successfully update item');
    
  });

  it('should update item expiration time', () => {
    const newExpirationTime = '2023-12-31T12:00';
    cy.get('#expirationTime').clear().type(newExpirationTime);
    cy.get('[name="update"]').click();
    cy.get('.modal h2').should('contain', 'Successfully update item');
    // Additional assertion based on updated information if applicable
  });

  it('should update item description', () => {
    const newDescription = 'Updated Description';
    cy.get('#description').clear().type(newDescription);
    cy.get('[name="update"]').click();
    cy.get('.modal h2').should('contain', 'Successfully update item');
    
  });
});

