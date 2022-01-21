/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    api(path: string, body?: RequestBody): Chainable<Response<any>>;
  }
}
