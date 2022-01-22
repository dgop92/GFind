/// <reference types="cypress" />

const userData = {
  username: "automatic_user_1",
  password: "1234juan1234",
};

describe("user goes to automatic register", () => {
  it("should register successfully", () => {
    cy.visit("/register/automatic");

    cy.get('input[name="username"]').type(userData.username);
    cy.get('input[name="password"]').type(userData.password);
    cy.get('input[name="password_confirmation"]').type(userData.password);

    cy.get("[type=submit]").click();

    cy.intercept("POST", "/register*", {
      statusCode: 201,
      fixture: "register/automatic_user_1",
    }).as("checkRegister");

    cy.wait("@checkRegister").should(({ request }) => {
      expect(request.body.password).to.be.equal(userData.password);
      expect(request.body.password_confirmation).to.be.equal(userData.password);
      expect(request.body.username).to.be.equal(userData.username);
    });

    cy.get("[data-test=success-snack]");
  });
  it("should show empty error", () => {
    cy.visit("/register/automatic");

    cy.get("[type=submit]").click();

    cy.get('[data-test="error-1"]')
      .should("have.length", 3)
      .and("contain", "estar vacío");
  });
  it("should show mismatch error", () => {
    cy.visit("/register/automatic");

    cy.get('input[name="username"]').type(userData.username);
    cy.get('input[name="password"]').type(userData.password);
    cy.get('input[name="password_confirmation"]').type("no-same-pass");

    cy.get("[type=submit]").click();

    cy.intercept("POST", "/register*", {
      statusCode: 400,
      fixture: "register/mismatch_pass",
    }).as("checkRegister");

    cy.wait("@checkRegister").should(({ response }) => {
      cy.contains(response.body.non_field_errors[0]);
    });
  });
  it("should show password or username error", () => {
    cy.visit("/register/automatic");

    cy.get('input[name="username"]').type(userData.username);
    cy.get('input[name="password"]').type("another");
    cy.get('input[name="password_confirmation"]').type("another");

    cy.get("[type=submit]").click();

    cy.intercept("POST", "/register*", {
      statusCode: 400,
      fixture: "register/user_or_password",
    }).as("checkRegister");

    cy.wait("@checkRegister").should(({ response }) => {
      cy.contains(response.body.non_field_errors[0]);
    });
  });
});
