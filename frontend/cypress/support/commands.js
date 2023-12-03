// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
import 'cypress-file-upload';
Cypress.Commands.add('loginWithRegistration', (email, password, name) => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().then((url) => {
        if (url.includes('/login')) {
            cy.visit('http://localhost:3000/register');
            cy.get('input#name').type(name);
            cy.get('input#email').type(email);
            cy.get('input#password').type(password);
            cy.get('label[for="terms"]').should('be.visible').click();
            cy.get('button[type="submit"]').click();

            cy.visit('http://localhost:3000/login');
            cy.get('input[type="email"]').type(email);
            cy.get('input[type="password"]').type(password);
            cy.get('button[type="submit"]').click();
        }
    });
});
