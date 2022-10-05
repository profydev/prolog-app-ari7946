import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import mockIssuesByBackendProject from "../fixtures/issues-backend.json";
import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssuesByBackendProjectAndWarningLevel from "../fixtures/issues-backend-and-warning.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusText = ["critical", "warning", "stable"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(capitalize(statusText[index]));
        });
    });

    it("verify that footer is present on page", () => {
      cy.get("footer").find("a").contains("Docs").should("exist");
      cy.get("footer").find("a").contains("API").should("exist");
      cy.get("footer").find("a").contains("Help").should("exist");
      cy.get("footer").find("a").contains("Community").should("exist");

      cy.get("footer").find("img[alt='Profy logo']").should("exist");
    });

    it.only("input field should be preset with correct project name and issues should only pertain to that project", () => {
      // click on View issues button for the backend project card
      cy.dataCy("view-issues-backend")
        .should("exist")
        .click()
        .then(() => {
          // get the the input field and assign it an alias
          cy.dataCy("filter-by-project").within(() => {
            cy.get("input").as("filter-input");
          });
        });
      // verify that the input field has preset value of 'backend'
      cy.get("@filter-input").should("have.value", "backend");
      cy.wait(1000);

      // veryify that all issues are related to the backend project only
      cy.validateIssues(mockIssuesByBackendProject);
    });
  });
});
