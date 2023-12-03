
import config from '../../src/services/apiConfig.json';

const API_URL = config.API_URL;

describe('UploadItems', () => {
  const email = 'test@ntu.edu.tw';
  const password = 'test123';
  const name = 'test user';

  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.loginWithRegistration(email, password, name);
    cy.url().should('include', '/');
    cy.contains('Logout').should('be.visible');
    cy.visit('http://localhost:3000/uploaditems');
  });

  function fillFormExcept(excludeField) {
    const fields = {
      name: 'Test Item Name',
      quantity: '5',
      endTime: '2022-12-31T23:59',
      location: 'Test Location'
    };

    for (const field in fields) {
      if (field !== excludeField) {
        cy.get(`input[name="${field}"]`).type(fields[field]);
      } else {
        cy.get(`input[name="${field}"]`).clear();
      }
    }
  }

  function submitFormAndCheckValidation(fieldName) {
    fillFormExcept(fieldName);
    cy.get('button[type="submit"]').click();
    cy.get(`input[name="${fieldName}"]`).invoke('prop', 'validationMessage')
      .should('match', /(Please fill out this field|請填寫這個欄位)/); // Regex to match either English or Traditional Chinese message
  }

  it('should upload successfully', () => {
    fillFormExcept();
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully uploaded item').should('be.visible'); // Adjust this to match your actual success message
  });


  it('should validate that the name is not empty', () => {
    submitFormAndCheckValidation('name');
  });

  it('should validate that the amount is not empty', () => {
    submitFormAndCheckValidation('quantity');
  });

  it('should validate that the endTime is not empty', () => {
    submitFormAndCheckValidation('endTime');
  });

  it('should validate that the location is not empty', () => {
    submitFormAndCheckValidation('location');
  });
});
