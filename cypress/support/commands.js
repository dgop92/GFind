/// <reference types="cypress" />

const API_URL = `${Cypress.env("apiUrl")}`;

Cypress.Commands.add("api", (path, body) => cy.request(API_URL + path, body));

Cypress.Commands.add("addUsernames", (usernames, options = { closeAtEnd: true }) => {
  cy.get('[data-test="find-users-card"]').get('[data-testid="AddIcon"]').click();
  usernames.forEach((username) => {
    cy.get('input[name="username"]').type(username);
    cy.get("[type=submit]").click();
  });
  if (options.closeAtEnd) {
    cy.get('[data-testid="CloseIcon"]').click();
  }
});
