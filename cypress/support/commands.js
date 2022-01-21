/// <reference types="cypress" />

const API_URL = `${Cypress.env("apiUrl")}`;

Cypress.Commands.add("api", (path, body) => cy.request(API_URL + path, body));
