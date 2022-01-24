/// <reference types="cypress" />

describe("user goes to analyze page and use the users card", () => {
  it("should get a successful response", () => {
    cy.visit("/analyze");

    cy.get('input[name="usernames_file"]').selectFile(
      "cypress/fixtures/analyze/archivo_de_usuarios.txt",
      { force: true }
    );
    cy.contains("archivo_de_usuarios.txt");
    cy.get('input[name="username_to_filter"]').type("juan");
    cy.get('input[name="extra_usernames"]').type("minijuan,dkonko");
    cy.get("button[type=submit]").click();

    cy.intercept("POST", "/analyze*", {
      statusCode: 200,
      fixture: "analyze/normal_hours",
    }).as("checkHours");

    /* cy.wait("@checkHours").should(({ request }) => {
    //   cy.log(request.body);
      // TODO: find multipart parser
    }); */
  });
  it("should throw no usernames error", () => {
    cy.visit("/analyze");

    cy.get("button[type=submit]").click();

    cy.intercept("POST", "/analyze*", {
      statusCode: 400,
      fixture: "analyze/no_usernames_provided",
    }).as("checkHours");

    cy.wait("@checkHours").should(({ response }) => {
      cy.contains(response.body.non_field_errors[0]);
    });
  });
  it("should throw username to filter not found error", () => {
    cy.visit("/analyze");

    cy.get('input[name="username_to_filter"]').type("random_user_1");
    cy.get('input[name="extra_usernames"]').type("minijuan,dkonko");
    cy.get("button[type=submit]").click();

    cy.intercept("POST", "/analyze*", {
      statusCode: 400,
      fixture: "analyze/username_filter_not_found",
    }).as("checkHours");

    cy.wait("@checkHours").should(({ response }) => {
      cy.contains(response.body.username_to_filter[0]);
    });
  });
});
