describe('End-to-End Tests', () => {
  const email = 'testuser@ntu.edu.tw';
  const password = 'Password123!';
  const name = 'Test User';

  beforeEach(() => {
	  cy.loginWithRegistration(email, password, name);
	  cy.viewport('macbook-13');
	  cy.url().should('include', '/');
	  cy.contains('Logout').should('be.visible');
	  cy.visit('http://localhost:3000/profile');
  });

  it('should navigate to User Profile and display user information', () => {
    cy.get('form[name="profile"]').should('exist');
    cy.get('form[name="profile"] .edit-profile').should('exist');
    cy.get('form[name="profile"] .profile-picNname').should('exist');
    cy.get('form[name="profile"] .profile-picNname .picture_frame').should('exist');
    cy.get('form[name="profile"] .profile-picNname .picture_frame .picture').should('exist');
    cy.get('form[name="profile"] .info-col label.info-title').should('exist');
    cy.get('form[name="profile"] .info-col input[name="name"]').should('exist');
    cy.get('form[name="profile"] .info-col div.info-title').should('exist');
    cy.get('form[name="profile"] .info-col input[type="checkbox"]').should('exist');
    cy.get('form[name="profile"] .info-col div.sent-edit button[type="submit"]').should('exist');
	
	cy.get('form[name="pwd"]').should('exist');
    cy.get('form[name="pwd"] .edit-profile').should('exist');
    cy.get('form[name="pwd"] input[name="oldpassword"]').should('exist');
    cy.get('form[name="pwd"] input[name="newpassword"]').should('exist');
    cy.get('form[name="pwd"] input[name="confirmpassword"]').should('exist');
    cy.get('form[name="pwd"] button[type="submit"]').should('exist');
    cy.get('form[name="pwd"] .forgot-password').should('exist');
	
    // 可以檢查是否有已儲存項目的列表
    cy.get('.itemlist').should('exist');
    // 確認元素中是否有預期的子元素
    cy.get('.itemlist .topbar button').should('have.length', 2);
    cy.get('.itemlist .topbar .add img').should('exist');
    cy.get('.itemlist .item-list').should('exist');

  });

  it('should navigate to Uploaded Items and display the list', () => {
	cy.get('button[name="upload item"]').contains('Uploaded Items').click();
	cy.get('.item-list').should('exist');
    //cy.url().should('include', '/uploaditems');
  });
  it('should navigate to Saved Items and display the list', () => {
	cy.get('button[name="saved item"]').contains('Saved Items').click();
	cy.get('.item-list').should('exist');
    //cy.url().should('include', '/uploaditems');
  });
  it('should navigate to Upload page', () => {
	cy.get('img[name="add image"]').click();
	cy.url().should('include', '/uploaditems');
  });
  
});
