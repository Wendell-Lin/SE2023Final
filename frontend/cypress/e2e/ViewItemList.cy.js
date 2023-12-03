describe('View Item List', () => {
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

    it('renders the search bar', () => {
        cy.get('.search-bar input[type="text"]').should('exist');
    });

    it('renders ItemList', () => {
        cy.fixture('FakeData').then((data) => {
            cy.intercept('GET', '**/items/getItems', {
                body: data.uploadedItems,
                statusCode: 200,
            }).as('getItems');
        });

        cy.visit('http://localhost:3000/viewitems');
        cy.wait('@getItems');
        cy.fixture('FakeData').then((data) => {
            cy.get('.list-container').children().should('have.length', data.uploadedItems.length);
        });
        
    });
    it('renders no itemList', () => {
        cy.fixture('FakeData').then((data) => {
            cy.intercept('GET', '**/items/getItems', {
                body: [],
                statusCode: 200,
            }).as('getItems');
        });

        cy.visit('http://localhost:3000/viewitems');
        cy.wait('@getItems');
        cy.fixture('FakeData').then((data) => {
            // Check if an appropriate message is displayed
            cy.get('.list-container').should('not.have.descendants', 'Item');
        });
        
    });
});
