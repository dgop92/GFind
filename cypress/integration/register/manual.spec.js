/* eslint-disable no-plusplus */
/// <reference types="cypress" />

const cellSelector = (i, j) =>
  `[data-test=uni-table] tbody tr:nth-child(${i + 1}) td:nth-child(${j + 2})`;

describe("user goes to manual register", () => {
  it("should be able to register successfully", () => {
    cy.visit("/register/manual");

    const indiciesFirstRow = Array.from(Array(5).keys()).map((i) => [0, i]);
    const indiciesSecondRow = Array.from(Array(5).keys()).map((i) => [1, i]);
    const indicies = [...indiciesFirstRow, ...indiciesSecondRow];

    indicies.forEach((ind) => {
      cy.get(cellSelector(ind[0], ind[1])).click();
    });

    cy.get('input[name="username"]').type("manual_user_1");
    cy.get("[type=submit]").click();

    cy.intercept("POST", "/manual*", {
      statusCode: 201,
      fixture: "register/manual_user_1",
    }).as("checkRegister");

    cy.wait("@checkRegister").should(({ request }) => {
      expect(request.body.list_of_indices).to.have.deep.members(indicies);
      expect(request.body.username).to.be.equal("manual_user_1");
    });

    cy.get("[data-test=success-snack]");
  });
  it("should be able to throw empty error", () => {
    cy.visit("/register/manual");

    cy.get(cellSelector(0, 0)).click();
    cy.get(cellSelector(3, 2)).click();

    cy.get("[type=submit]").click();
    cy.contains("estar vacío");
  });
  it("should be able to throw unique error", () => {
    cy.visit("/register/manual");

    cy.get(cellSelector(10, 4)).click();

    cy.get('input[name="username"]').type("repeated_username");
    cy.get("[type=submit]").click();

    cy.intercept("POST", "/manual*", {
      statusCode: 400,
      fixture: "register/unique_username",
    }).as("checkRegister");

    cy.wait("@checkRegister").should(({ response }) => {
      cy.contains(response.body.username[0]);
    });
  });
});

// .MuiTableBody-root > :nth-child(1) > :nth-child(2)
