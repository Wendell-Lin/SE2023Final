describe('Follow Item', () => {
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
    it('follow items', () => {
        cy.intercept('PUT', '**/user/follow-item', (req) => {
        
            // Optionally modify the request or directly send a response
            req.reply({
                statusCode: 200,
                body: {
                },
            });
        }).as('followItem');
        cy.get('.like-icon').first().click();

        // Wait for the 'followItem' request to complete
        cy.wait('@followItem').then((interception) => {
            cy.get('.like-icon img').should('have.attr', 'src', '/images/HeartDark.png');

        });

    });
    it('follow and unfollow item', () => {
        cy.intercept('PUT', '**/user/follow-item', (req) => {
        
            // Optionally modify the request or directly send a response
            req.reply({
                statusCode: 200,
                body: {
                },
            });
        }).as('followItem');
        cy.get('.like-icon').first().click();

        // Wait for the 'followItem' request to complete
        cy.wait('@followItem').then((interception) => {
            cy.get('.like-icon img').should('have.attr', 'src', '/images/HeartDark.png');

        });
        cy.get('.like-icon').first().click();
        cy.wait('@followItem').then((interception) => {
            cy.get('.like-icon img').should('have.attr', 'src', '/images/HeartLight.png');

        });

    });
});