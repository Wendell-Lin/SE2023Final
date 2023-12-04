describe("Change Password Test", () => {
  const email = "testuser119210@ntu.edu.tw";
  const password = "Passwordtesting119210";
  const name = "TestUser119210";

  beforeEach(() => {
    cy.loginWithRegistration(email, password, name);
    cy.viewport("macbook-13");
    cy.url().should("include", "/");
    cy.contains("Logout").should("be.visible");
    // Visit the password change page
    cy.visit("http://localhost:3000/profile");
  });

  it("should show error for invalid old password", () => {
    // Provide an incorrect old password
    cy.get('form[name="pwd"] input[name="oldpassword"]').type(
      "IncorrectOldPassword"
    );
    cy.get('form[name="pwd"] input[name="newpassword"]').type(
      "NewPassword123!"
    );
    cy.get('form[name="pwd"] input[name="confirmpassword"]').type(
      "NewPassword123!"
    );

    // Submit the form
    cy.get('form[name="pwd"]').submit();

    // Check for error message or any indication of failure
    cy.contains("Incorrect old password").should("be.visible");
  });
  it("should change password and submit", () => {
    // Change password
    cy.get('form[name="pwd"] input[name="oldpassword"]').type(password);
    cy.get('form[name="pwd"] input[name="newpassword"]').type(
      "NewPassword123!"
    );
    cy.get('form[name="pwd"] input[name="confirmpassword"]').type(
      "NewPassword123!"
    );

    // Submit the form
    cy.get('form[name="pwd"]').submit();

    // Check for success message or updated UI
    cy.contains("Successfully Change Password").should("be.visible");
  });
});
