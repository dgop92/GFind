/// <reference types="cypress" />

describe("user goes to find page and use the users card", () => {
  it("should add users and remove users", () => {
    cy.visit("/find");

    cy.addUsernames(["juan"]);
    cy.contains("juan");
    cy.get('[data-testid="CancelIcon"]').click();
    cy.contains("juan").should("not.exist");
  });
  it("shouldn't add repeated users", () => {
    cy.visit("/find");

    cy.addUsernames(["juan", "juan"], { closeAtEnd: false });
    cy.contains("Ya agregaste a este usuario");
  });
  it("should show empty error", () => {
    cy.visit("/find");

    cy.get('[data-test="find-users-card"]').get('[data-testid="AddIcon"]').click();
    cy.get("[type=submit]").click();
    cy.contains("vacío");
  });
  it("should show long username error", () => {
    cy.visit("/find");

    cy.addUsernames(["juanjuanjuanjuanjuanjuanjuanjuan"], { closeAtEnd: false });
    cy.contains("no puede superar");
  });
  it("should show user not found error", () => {
    cy.visit("/find");

    const usernames = ["juan", "minijuan"];
    cy.addUsernames(usernames);
    cy.intercept("POST", "/results*", {
      statusCode: 400,
      fixture: "gaps/user_not_found",
    }).as("checkResults");
    cy.wait("@checkResults").should(({ response }) => {
      cy.contains(response.body.usernames[0]);
    });
  });
  it("should trigger request after two users added", () => {
    cy.visit("/find");

    const usernames = ["juan", "minijuan"];
    cy.addUsernames(usernames);
    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/empty_gaps",
    }).as("checkResults");
    cy.wait("@checkResults").should(({ request }) => {
      expect(request.body.usernames).to.have.members(usernames);
    });
  });
});
