describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.viewport(1440, 900);
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
