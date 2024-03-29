describe('View Item Details', () => {
    const email = 'test@ntu.edu.tw';
    const password = 'test123';
    const name = 'test user';

    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.loginWithRegistration(email, password, name);
        cy.url().should('include', '/');
        cy.contains('Logout').should('be.visible');

        cy.fixture('FakeData').then((data) => {
            cy.intercept('GET', '**/items/getItems', {
                body: data.uploadedItems,
                statusCode: 200,
            }).as('getItems');
        });
        cy.visit('http://localhost:3000/viewitems');
        cy.wait('@getItems');
    });
    it('filters existing items based on search term', () => {
        cy.fixture('FakeData').then((data) => {
            // Assuming that data.uploadedItems[0] exists and has a 'name' property
            const searchTerm = data.uploadedItems[0].name; // Using an existing item's name as the search term

            cy.get('.search-bar input[type="text"]').type(searchTerm);

            const filteredItems = data.uploadedItems.filter(item =>
                item.name.includes(searchTerm) || item.description.includes(searchTerm)
            );

            cy.get('.list-container').children().should('have.length', filteredItems.length);
            cy.get('.list-container').should('contain', searchTerm);
            cy.get('.item-container').first().click();
            
            // Now verify various elements in the ItemDetail component
            cy.get('.item-detail-backdrop').should('be.visible');
        });
    });
});