/// <reference types="cypress" />

const cellSelector = (i, j) =>
  `[data-test=uni-table] tbody tr:nth-child(${i + 1}) td:nth-child(${j + 2})`;

describe("user goes to find page and use the settings modal", () => {
  it("should send default settings", () => {
    cy.visit("/find");

    cy.addUsernames(["juan", "minijuan"]);

    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/normal_gaps",
    }).as("checkResults");

    cy.wait("@checkResults").should(({ request }) => {
      const { usernames, ...settings } = request.body;
      expect(settings).to.deep.equal({
        compute_sd: false,
        no_classes_day: false,
        ignore_weekend: true,
      });
    });
  });
  it("should send the selected settings", () => {
    cy.visit("/find");

    cy.get('[data-test="find-gaps-card"]').get('[data-testid="FilterAltIcon"]').click();
    cy.get('input[name="no_classes_day"]').check();
    cy.get('input[name="compute_sd"]').check();
    cy.get('input[name="ignore_weekend"]').uncheck();
    cy.get('[data-test="filter-days-btn-group"]').get('button[value="0"]').click();
    cy.get('[data-test="filter-days-btn-group"]').get('button[value="2"]').click();
    cy.get('[data-test="filter-days-btn-group"]').get('button[value="4"]').click();
    cy.get('[data-testid="CloseIcon"]').click();

    cy.addUsernames(["juan", "minijuan"]);

    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/normal_gaps",
    }).as("checkResults");

    cy.wait("@checkResults").should(({ request }) => {
      const { usernames, ...settings } = request.body;
      expect(settings).to.deep.equal({
        compute_sd: true,
        no_classes_day: true,
        ignore_weekend: false,
        days_to_filter: [0, 2, 4],
      });
    });
  });
});

describe("user goes to find page", () => {
  it("should see the gaps in table", () => {
    cy.visit("/find");

    cy.addUsernames(["juan", "minijuan"]);

    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/normal_gaps",
    }).as("checkResults");

    cy.wait("@checkResults");

    cy.get(cellSelector(5, 2)).contains("90.00 %");
    cy.get(cellSelector(13, 1)).contains("80.00 %");
    cy.get(cellSelector(4, 4)).contains("50.00 %");
  });
  it("should see the gaps in simple view", () => {
    cy.visit("/find");

    cy.get('[data-test="find-gaps-card"]').get('[data-testid="FilterAltIcon"]').click();
    cy.get("#view-id").click();
    cy.get('[data-value="simple"]').click();
    cy.get('[data-testid="CloseIcon"]').click();

    cy.addUsernames(["juan", "minijuan"]);

    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/normal_gaps",
    }).as("checkResults");

    cy.wait("@checkResults");

    cy.contains("Miercoles - 11:30 AM");
    cy.contains("Martes - 7:30 PM");
    cy.contains("Viernes - 10:30 AM");
  });
  it("should see the gaps in simple view with avg and sd", () => {
    cy.visit("/find");

    cy.get('[data-test="find-gaps-card"]').get('[data-testid="FilterAltIcon"]').click();
    cy.get("#view-id").click();
    cy.get('[data-value="simple"]').click();
    cy.get('input[name="showAvgSd"]').check();
    cy.get('[data-testid="CloseIcon"]').click();

    cy.addUsernames(["juan", "minijuan"]);

    cy.intercept("POST", "/results*", {
      statusCode: 200,
      fixture: "gaps/normal_gaps",
    }).as("checkResults");

    cy.wait("@checkResults");
    cy.contains("Avg: 1.50 - Sd: 2.00");
    cy.contains("Avg: 2.30 - Sd: 0.40");
    cy.contains("Avg: 2.30 - Sd: 0.90");
  });
});
