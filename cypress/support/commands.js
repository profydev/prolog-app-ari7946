// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("validateIssues", (mockedIssues) => {
  cy.get("main")
    .find("tbody")
    .find("tr")
    .each(($el, index) => {
      const issue = mockedIssues.items[index];
      const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
      console.log("issue", issue);
      cy.wrap($el).contains(issue.name);
      cy.wrap($el).contains(issue.message);
      cy.wrap($el).contains(issue.numEvents);
      cy.wrap($el).contains(firstLineOfStackTrace);
    });
});

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
