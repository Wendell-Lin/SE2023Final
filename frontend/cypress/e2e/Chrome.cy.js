describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.viewport('macbook-13');
  });
  it('should successfully log in a user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('r11944040@ntu.edu.tw');
    cy.get('input[type="password"]').type('Simple/123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.contains('Logout').should('be.visible');
  });
  it('should display error for incorrect email', () => {
    cy.get('input[type="email"]').type('r119440400@ntu.edu.tw');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('The email or password you entered is incorrect.').should('exist');
  });
  it('should display error for incorrect password', () => {
    cy.get('input[type="email"]').type('r11944040@ntu.edu.tw');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('The email or password you entered is incorrect.').should('exist');
  });
});

describe('Register Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
    cy.viewport('macbook-13');
  });
  it('should successfully register a user', () => {
    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('john.doe@ntu.edu.tw');
    cy.get('input#password').type('Password123!');
    cy.get('label[for="terms"]').should('be.visible').click();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
  it('should show error for already used email', () => {
    cy.get('input#name').type('Jane Doe');
    cy.get('input#email').type('existinguser@ntu.edu.tw');
    cy.get('input#password').type('Password123!');
    cy.get('label[for="terms"]').should('be.visible').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Email or Username already exists.').should('be.visible');
  });
  it('should show error for not agreeing to terms and conditions', () => {
    cy.get('input#name').type('New User');
    cy.get('input#email').type('new.user@ntu.edu.tw');
    cy.get('input#password').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.contains('Please agree to the terms & policy').should('be.visible');
  });
});
