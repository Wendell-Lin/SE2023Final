describe('ViewItemsMap Component', () => {
    const email = 'test@ntu.edu.tw';
    const password = 'test123';
    const name = 'test user';

    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.loginWithRegistration(email, password, name);
        cy.url().should('include', '/');
        cy.contains('Logout').should('be.visible');
        cy.visit('http://localhost:3000/viewitems');
    });

    it('renders items on the map', () => {
        cy.fixture('FakeData').then((data) => {
            cy.intercept('GET', '**/items/getItems', {
                body: data.uploadedItems,
                statusCode: 200,
            }).as('getItems');
        });

        cy.visit('http://localhost:3000/viewitems');
        cy.wait('@getItems');

        // Assuming a reasonable delay for the map and markers to load
        cy.wait(3000); // Adjust the delay based on your app's behavior

        cy.fixture('FakeData').then((data) => {

            // Verify that the map has been loaded
            cy.get('#map').should('be.visible');
        });
    });
});
